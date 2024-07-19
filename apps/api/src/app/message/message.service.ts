import { FirestoreDatabaseProvider } from "../firestore/firestore.providers";
import { CollectionReference } from "@google-cloud/firestore";
import { MessageDocument } from "../../documents/message.document";
import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { MessageType } from 'types/Message.type'
import { MessageDTO } from "./dto/message.dto";
import { ChatService } from "../chat/chat.service";
import { ChatEnum } from "types/Chat.type";

@Injectable() 
  export class MessageService {
    constructor (
      @Inject(MessageDocument.collectionName)
      private messageCollection: CollectionReference<MessageType>,
      private chatService: ChatService,
      @Inject(FirestoreDatabaseProvider)
      private db,
    ) {}

    async createMessage(messageData: MessageDTO): Promise<MessageType> {
      const chatExist = await this.chatService.checkChatExist(messageData.chatId);

      if (!chatExist) {
        await this.chatService.createChat({
          id: messageData.chatId,
          participants: [messageData.senderId],
          type: ChatEnum.DIRECT,
          creatorId: messageData.senderId,
        });
      }
      
      const writeBatch = this.db.batch();
      const docRef = this.messageCollection.doc();
      writeBatch.set(docRef, {
        timestamp: new Date(),
        ...messageData,
      });
      await writeBatch.commit();
      const messageDoc = await docRef.get();
      const message = { ...messageDoc.data(), id: messageDoc.id };

      await this.chatService.updateLastMessage(messageData.chatId, message.id);

      return message;
    }
  }

