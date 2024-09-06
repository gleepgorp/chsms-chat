import { FirestoreDatabaseProvider } from '../firestore/firestore.providers';
import { CollectionReference, Timestamp } from '@google-cloud/firestore';
import { MessageDocument } from '../../documents/message.document';
import { Injectable, Inject, forwardRef, HttpException, HttpStatus } from '@nestjs/common';
import { MessageType } from 'types/Message.type'
import { MessageDTO } from './dto/message.dto';
import { ChatService } from '../chat/chat.service';
import { ChatEnum } from 'types/Chat.type';
import { ChatDocument } from '../../documents/chat.document';
import { ChatGateway } from '../chat/chat.gateway';
import { UserService } from '../user/user.service';

@Injectable() 
  export class MessageService {
    constructor (
      @Inject(MessageDocument.collectionName)
      private messageCollection: CollectionReference<MessageType>,
      @Inject(ChatDocument.collectionName)  
      private chatCollection: CollectionReference<MessageType>,
      @Inject(forwardRef(() => ChatService))
      private chatService: ChatService,
      @Inject(forwardRef(() => UserService))
      private userService: UserService,
      @Inject(forwardRef(() => ChatGateway))
      private chatGateway: ChatGateway,
      @Inject(FirestoreDatabaseProvider)  
      private db, 
    ) {}

    async createMessage(messageData: MessageDTO, replyId?: string): Promise<MessageType> {
      let chatId: string;
      const singleRecipient = 1;
      let recipients: string[];

      if (Array.isArray(messageData.recipientId)) {
        recipients = messageData.recipientId;
      } else if (typeof messageData.recipientId === 'string') {
        recipients = [messageData.recipientId];
      }

      const existingChat = await this.chatService.findExistingChat(messageData.senderId, recipients);

      if (existingChat) { 
        chatId = existingChat.id;
      } else {
        const recipientId = messageData.recipientId.map(id => id);
        const userIds = [...recipientId, messageData.senderId]
        const participants = await this.userService.findByIds(userIds);
        const participantDetails = participants.map((participant) => ({
          id: participant.accountId,
          firstname: participant.firstname,
          lastname: participant.lastname,
          profileBgColor: participant.profileBgColor,
          profilePicture: participant.profilePicture,
        }))

        const newChat = await this.chatService.createChat({
          participants: [messageData.senderId, ...recipients],
          participantsDetails: participantDetails,
          lastMessageId: '',
          chatName: "",
          creatorId: messageData.senderId,
          type: recipients.length > singleRecipient ? ChatEnum.GROUP : ChatEnum.DIRECT,
          deletedBy: []
        });
        chatId = newChat.id;
      }
      
      const sender = await this.userService.findById(messageData.senderId);
      const senderFormatted = {
        firstname: sender.firstname,
        lastname: sender.lastname,
        profileBgColor: sender.profileBgColor || "",
        profilePicture: sender.profilePicture || ""
      }

      const writeBatch = this.db.batch(); 
      const docRef = this.messageCollection.doc();
      const batchData = {
        messageId: docRef.id,
        timestamp: new Date(),
        chatId: chatId,
        sender: senderFormatted,
        ...messageData,
      };

      if (replyId) {
        const replyDoc = await this.messageCollection.doc(replyId).get();
        const replyDocRef = replyDoc.data();
        const reply = {
          id: replyDocRef.senderId,
          content: replyDocRef.content,
          sender: replyDocRef.sender
        };
        batchData.reply = reply;
      }

      writeBatch.set(docRef, batchData);
      
      const chatRef = this.chatCollection.doc(chatId);
      writeBatch.update(chatRef, {
        lastMessageId: docRef.id,
        updatedAt: new Date(),
      });

      await writeBatch.commit();
      const messageDoc = await docRef.get();
      const message = { ...messageDoc.data(), id: messageDoc.id } as MessageType;

      await this.chatService.updateLastMessage(chatId, message.id);

      // emit new mssg to chatroom
      this.chatGateway.server.to(chatId).emit('newMessage', message);

      return message;
    } 

    async createMessageGroupChat(messageData: MessageDTO, chatId: string, replyId?: string): Promise<MessageType> {
      const writeBatch = this.db.batch();
      const docRef = this.messageCollection.doc();

      const sender = await this.userService.findById(messageData.senderId);
      const senderFormatted = {
        firstname: sender.firstname,
        lastname: sender.lastname,
        profileBgColor: sender.profileBgColor || "",
        profilePicture: sender.profilePicture || ""
      }

      const batchData = {
        messageId: docRef.id,
        timestamp: new Date(),
        chatId: chatId,
        sender: senderFormatted,
        ...messageData,
      };

      if (replyId) {
        const replyDoc = await this.messageCollection.doc(replyId).get();
        const replyDocRef = replyDoc.data();
        const reply = {
          id: replyDocRef.senderId,
          content: replyDocRef.content,
          sender: replyDocRef.sender
        };
        batchData.reply = reply;
      }

      writeBatch.set(docRef, batchData);

      const chatRef = this.chatCollection.doc(chatId);
      writeBatch.update(chatRef, {
        lastMessageId: docRef.id,
        updatedAt: new Date(),
      });

      await writeBatch.commit();
      const messageDoc = await docRef.get();
      const message = { ...messageDoc.data(), id: messageDoc.id } as MessageType;

      await this.chatService.updateLastMessage(chatId, message.id);
      this.chatGateway.server.to(chatId).emit('newMessage', message);

      return message;
    }

    async getMessageById(messageId: string): Promise<MessageType> {
      const messageSnapshot = await this.messageCollection.doc(messageId).get();

      return { ...messageSnapshot.data(), id: messageSnapshot.id } as MessageType;
    }

    async getMessageByLastMessageId(id: string): Promise<MessageType | null> {
      const messageSnapshot = await this.messageCollection
        .where('messageId', '==', id)
        .limit(1)
        .get();
    
      if (messageSnapshot.empty) {
        return null;
      }
    
      return messageSnapshot.docs[0].data() as MessageType;
    }

    async getMessagesByChatId(id: string, pageSize: number, seconds?: number, nanoseconds?: number): Promise<MessageType[]> {
      try {
        let query = this.messageCollection
          .where('chatId', '==', id)
          .orderBy('timestamp', 'desc')
          .limit(pageSize);
    
        if (seconds !== undefined && nanoseconds !== undefined) {
          const lastVisibleTimestamp = new Timestamp(seconds, nanoseconds);
          query = query.startAt(lastVisibleTimestamp);
        }
    
        const messageSnapshot = await query.get();
    
        const messages = messageSnapshot.docs.map((doc) => ({
          ...doc.data(),
          messageId: doc.id,
        }));
    
        const formattedMessages = messages.map((message) => ({
          chatId: message.chatId,
          messageId: message.messageId,
          content: message.content,
          timestamp: message.timestamp,
          recipientId: message.recipientId,
          senderId: message.senderId,
          sender: {
            firstname: message.sender.firstname,
            lastname: message.sender.lastname,
            profileBgColor: message.sender.profileBgColor || "",
            profilePicture: message.sender.profilePicture || ""
          },
          reply: message.reply,
        }));
    
        return formattedMessages as MessageType[];
      } catch (err) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    async deleteMessagesByChatId(chatId: string): Promise<void> {
      const messageSnapshot = await this.messageCollection
      .where('chatId', '==', chatId).limit(500);

      const batch = this.db.batch();

      messageSnapshot
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          batch.delete(doc.ref);
        })
        return batch.commit();
      })
    }
  }

