import { FirestoreDatabaseProvider } from "../firestore/firestore.providers";
import { CollectionReference } from "@google-cloud/firestore";
import { ChatDocument } from "../../documents/chat.document";
import { Injectable, Inject, HttpException, HttpStatus, forwardRef } from "@nestjs/common";
import { ChatType } from "types/Chat.type";
import { ChatDTO } from "./dto/chat.dto";
import { UserService } from "../user/user.service";
import { MessageService } from "../message/message.service";

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
    const allParticipants = [senderId, ...recipients].sort();

    const chatSnapshot = await this.chatCollection
    .where('participants', '==', allParticipants)
    .limit(1)
    .get();

    if (!chatSnapshot.empty) {
      return { id: chatSnapshot.docs[0].id };
    }

    return null;
  }

  async getChatsByUserId(userId: string): Promise<ChatType[]> {
    try {
      const chatSnapshot = await this.chatCollection
      .where('participants', 'array-contains', userId)
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