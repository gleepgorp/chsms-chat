import { FirestoreDatabaseProvider } from "../firestore/firestore.providers";
import { CollectionReference } from "@google-cloud/firestore";
import { ChatDocument } from "../../documents/chat.document";
import { Injectable, Inject, HttpException, HttpStatus, forwardRef, NotFoundException } from "@nestjs/common";
import { ChatEnum, ChatType } from "types/Chat.type";
import { ChatDTO } from "./dto/chat.dto";
import { UserService } from "../user/user.service";
import { MessageService } from "../message/message.service";
import { ProfileType } from "types/Profile.type";

@Injectable()
export class ChatService {
  constructor (
    @Inject(ChatDocument.collectionName)
    private chatCollection: CollectionReference<ChatType>,
    @Inject(forwardRef(() => MessageService))
    private messageService: MessageService,
    private userService: UserService,
    @Inject(FirestoreDatabaseProvider)
    private db,
  ) {}

  async createChat(chatData: ChatDTO): Promise<ChatType> {
    const writeBatch = this.db.batch();
    const docRef = this.chatCollection.doc();
    writeBatch.set(docRef, {
      updatedAt: new Date(),
      ...chatData,
    });
    await writeBatch.commit();
    const chatDoc = await docRef.get();
    const chat = { ...chatDoc.data(), id: chatDoc.id };

    return chat;
  }

  async updateLastMessage(chatId: string, messageId: string): Promise<void> {
    await this.chatCollection.doc(chatId).update({
      lastMessageId: messageId,
      updatedAt: new Date(),
    })
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

  async getChatsByUserId(userId: string): Promise<ChatType[]> {
    try {
      const chatSnapshot = await this.chatCollection
        .where('participants', 'array-contains', userId)
        .orderBy('updatedAt', 'desc')
        .get();

      const chats: ChatType[] = await Promise.all(chatSnapshot.docs.map(async (doc) => {
        const chatData = doc.data();
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
          type: chatData.type,
          updatedAt: chatData.updatedAt,
          lastMessage: lastMessage || null,
        };
      }));

      return chats as unknown as ChatType[];
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}