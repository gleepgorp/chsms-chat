import { FirestoreDatabaseProvider } from "../firestore/firestore.providers";
import { CollectionReference } from "@google-cloud/firestore";
import { ChatDocument } from "../../documents/chat.document";
import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { ChatType } from "types/Chat.type";
import { ChatDTO } from "./dto/chat.dto";

@Injectable()
export class ChatService {
  constructor (
    @Inject(ChatDocument.collectionName)
    private chatCollection: CollectionReference<ChatType>,
    @Inject(FirestoreDatabaseProvider)
    private db,
  ) {}

  async checkChatExist(chatId: string): Promise<boolean> {
    const chatDoc = await this.chatCollection.doc(chatId).get();
    return chatDoc.exists;
  }

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
}