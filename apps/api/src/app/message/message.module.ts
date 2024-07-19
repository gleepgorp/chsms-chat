import { Module } from "@nestjs/common";
import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";
import { ChatService } from "../chat/chat.service";

@Module({
  controllers: [MessageController],
  exports: [MessageService, ChatService],
  imports: [],
  providers: [MessageService, ChatService],
})
export class MessageModule {};