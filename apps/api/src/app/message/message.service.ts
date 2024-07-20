import { FirestoreDatabaseProvider } from "../firestore/firestore.providers";
import { CollectionReference } from "@google-cloud/firestore";
import { MessageDocument } from "../../documents/message.document";
import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { MessageType } from 'types/Message.type'
import { MessageDTO } from "./dto/message.dto";
import { ChatService } from "../chat/chat.service";
import { ChatEnum } from "types/Chat.type";
import { ChatDocument } from "../../documents/chat.document";

@Injectable() 
  export class MessageService {
    constructor (
      @Inject(MessageDocument.collectionName)
      private messageCollection: CollectionReference<MessageType>,
      @Inject(ChatDocument.collectionName)  
      private chatCollection: CollectionReference<MessageType>,
      private chatService: ChatService,
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

      return message;
    }
  }

