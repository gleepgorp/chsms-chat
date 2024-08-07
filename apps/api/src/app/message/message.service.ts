import { FirestoreDatabaseProvider } from '../firestore/firestore.providers';
import { CollectionReference } from '@google-cloud/firestore';
import { MessageDocument } from '../../documents/message.document';
import { Injectable, Inject, forwardRef, HttpException, HttpStatus } from '@nestjs/common';
import { MessageType } from 'types/Message.type'
import { MessageDTO } from './dto/message.dto';
import { ChatService } from '../chat/chat.service';
import { ChatEnum } from 'types/Chat.type';
import { ChatDocument } from '../../documents/chat.document';
import { ChatGateway } from '../chat/chat.gateway';

@Injectable() 
  export class MessageService {
    constructor (
      @Inject(MessageDocument.collectionName)
      private messageCollection: CollectionReference<MessageType>,
      @Inject(ChatDocument.collectionName)  
      private chatCollection: CollectionReference<MessageType>,
      @Inject(forwardRef(() => ChatService))
      private chatService: ChatService,
      @Inject(forwardRef(() => ChatGateway))
      private chatGateway: ChatGateway,
      @Inject(FirestoreDatabaseProvider)  
      private db, 
    ) {}

    async createMessage(messageData: MessageDTO): Promise<MessageType> {
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
        const newChat = await this.chatService.createChat({
          participants: [messageData.senderId, ...recipients],
          type: recipients.length > singleRecipient ? ChatEnum.GROUP : ChatEnum.DIRECT,
          creatorId: messageData.senderId,
          chatName: ""
        });
        chatId = newChat.id;
      }
      
      const writeBatch = this.db.batch(); 
      const docRef = this.messageCollection.doc();
      writeBatch.set(docRef, {
        messageId: docRef.id,
        timestamp: new Date(),
        chatId: chatId, 
        ...messageData,
      });
      
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

    async getMessagesByChatId(id: string): Promise<MessageType[]> {
      try {
        const messageSnapshot = await this.messageCollection
        .where('chatId', '==', id)
        .orderBy('timestamp', 'asc')
        .get();
        
        const message = messageSnapshot.docs.map((doc) => ({
          ...doc.data()
        }));

        const formattedMessages = message.map((message) => ({
          content: message.content,
          timestamp: message.timestamp,
          recipientId: message.recipientId,
          senderId: message.senderId,
        }));

        return formattedMessages as unknown as MessageType[];
      } catch (err) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

