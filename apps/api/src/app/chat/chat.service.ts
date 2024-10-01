import { FirestoreDatabaseProvider } from "../firestore/firestore.providers";
import { CollectionReference, Timestamp } from "@google-cloud/firestore";
import { ChatDocument } from "../../documents/chat.document";
import { Injectable, Inject, HttpException, HttpStatus, forwardRef, NotFoundException } from "@nestjs/common";
import { ChatEnum, ChatType } from "types/Chat.type";
import { ChatDTO } from "./dto/chat.dto";
import { UserService } from "../user/user.service";
import { MessageService } from "../message/message.service";
import { ProfileType } from "types/Profile.type";
import { ChatGateway } from "./chat.gateway";
import { MessageDTO } from "../message/dto/message.dto";
import { MessageDocument } from "../../documents/message.document";
import { MessageType } from "types/Message.type";

@Injectable()
export class ChatService {
  constructor (
    @Inject(ChatDocument.collectionName)
    private chatCollection: CollectionReference<ChatType>,
    @Inject(MessageDocument.collectionName)
    private messageCollection: CollectionReference<MessageType>,
    @Inject(forwardRef(() => MessageService))
    private messageService: MessageService,
    private userService: UserService,
    private chatGateway: ChatGateway,
    @Inject(FirestoreDatabaseProvider)
    private db,
  ) {}

  async createChat(chatData: ChatDTO, initialMessage?: MessageDTO): Promise<ChatType> {
    const writeBatch = this.db.batch();
    const docRef = this.chatCollection.doc();

    let lastMessageId = '';

    const participants = await this.userService.findByIds(chatData.participants);
    const participantDetails = participants.map((participant) => ({
      id: participant.accountId,
      firstname: participant.firstname,
      lastname: participant.lastname,
      profileBgColor: participant.profileBgColor,
      profilePicture: participant.profilePicture,
    }))

    if (initialMessage) {
      const messageDocRef = this.messageCollection.doc();
      writeBatch.set(messageDocRef, {
        messageId: messageDocRef.id,
        timestamp: new Date(),
        chatId: docRef.id,
        ...initialMessage,
      });
      lastMessageId = messageDocRef.id;
    }

    writeBatch.set(docRef, {
      updatedAt: new Date(),
      lastMessageId,
      participantsDetails: participantDetails,
      ...chatData,
    });
    await writeBatch.commit();

    const chatObject = await this.getChatByIdLong(docRef.id);

    this.chatGateway.server.emit('newChat', chatObject);

    return chatObject;
  }

  async updateLastMessage(chatId: string, messageId: string): Promise<void> {
    const chatRef = this.chatCollection.doc(chatId);
    const updatedAt = new Date();
    await chatRef.update({
      lastMessageId: messageId,
      updatedAt: updatedAt,
    });
  
    // Emit lastMessageUpdated event
    this.chatGateway.server.to(chatId).emit('lastMessageUpdated', { chatId, messageId });
    
    // Emit chatUpdated event with the full chat object
    const updatedChat = await this.getChatByIdLong(chatId);
    this.chatGateway.server.to(chatId).emit('chatUpdated', updatedChat);
  }

  async findExistingChat(senderId: string, recipients: string[]): Promise<{ id: string } | null> {
    if (recipients.length === 1) {
      const participant1 = senderId;
      const participant2 = recipients[0];
  
      const chatSnapshot = await this.chatCollection
        .where('type', '==', ChatEnum.DIRECT)
        .where('participants', 'array-contains', participant1)
        .get();
  
      const exactMatch = chatSnapshot.docs.find(doc => {
        const docParticipants = doc.data().participants;
        return docParticipants.length === 2 &&
               docParticipants.includes(participant1 as unknown as ProfileType) &&
               docParticipants.includes(participant2 as unknown as ProfileType);
      });
  
      if (exactMatch) {
        return { id: exactMatch.id };
      }
    }
  
    return null;
  }

  async getChatById(id: string): Promise<ChatType> {
    try {
      const snapshot = await this.chatCollection.doc(id).get();
      
      return { ...snapshot.data(), id: snapshot.id } as ChatType;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getChatByIdLong(id: string): Promise<ChatType> {
    try {
      const snapshot = await this.chatCollection.doc(id).get();
      if (!snapshot.exists) {
        throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
      }
  
      const chatData = snapshot.data();
      const participants = chatData.participants;
      const lastMessageId = chatData.lastMessageId;
      const users = await this.userService.findByIds(participants as unknown as string[]);
      const lastMessage = await this.messageService.getMessageByLastMessageId(lastMessageId);
  
      return {
        id: snapshot.id,
        participants: users,
        lastMessageId: lastMessageId,
        chatName: chatData.chatName || '',
        creatorId: chatData.creatorId,
        type: chatData.type || ChatEnum.DIRECT,
        updatedAt: chatData.updatedAt,
        lastMessage: lastMessage || null,
        deletedBy: []
      } as ChatType;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getChatByParticipants(senderId: string, recipients: string[]): Promise<ChatType | null> {
    const allParticipants = [senderId, ...recipients].sort();
    
    const chatSnapshot = await this.chatCollection
      .where('participants', '==', allParticipants)
      .limit(1)
      .get();
  
    if (!chatSnapshot.empty) {
      const doc = chatSnapshot.docs[0];
      return {
        id: doc.id,
      } as ChatType;
    }
  
    return null;
  }

  async getChatsByUserId(userId: string, pageSize: number, seconds?: number, nanoseconds?: number): Promise<ChatType[]> {
    try {
      let query = this.chatCollection
      .where('participants', 'array-contains', userId)
      .orderBy('updatedAt', 'desc')
      .limit(pageSize);

      if (seconds !== undefined && nanoseconds !== undefined) {
        const lastVisibleTimestamp = new Timestamp(seconds, nanoseconds);
        query = query.startAt(lastVisibleTimestamp);
      }

      const chatSnapshot = await query.get();

      const chats: ChatType[] = await Promise.all(chatSnapshot.docs.map(async (doc) => {
        const chatData = doc.data();
        
        if (chatData.deletedBy && chatData.deletedBy.includes(userId)) {{
          return null;
        }}

        const participants = chatData.participants;
        const lastMessageId = chatData.lastMessageId;
        const users = await this.userService.findByIds(participants as unknown as string[]);
        const lastMessage = await this.messageService.getMessageByLastMessageId(lastMessageId);

        return {
          id: doc.id,
          participants: users,
          lastMessageId: lastMessageId,
          chatName: chatData.chatName || '',
          creatorId: chatData.creatorId,
          type: chatData.type || ChatEnum.DIRECT,
          updatedAt: chatData.updatedAt,
          lastMessage: lastMessage || null,
          deletedBy: []
        };
      }));

      return chats.filter(chat => chat !== null) as unknown as ChatType[];
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteChatAndMessagesByChatId(id: string): Promise<void> {
    try {
      await this.chatCollection.doc(id).delete();
      await this.messageService.deleteMessagesByChatId(id);

    } catch(err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}