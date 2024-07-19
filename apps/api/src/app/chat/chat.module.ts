import { Module } from "@nestjs/common";
import { ChatController } from "./chat.sontroller";
import { ChatService } from "./chat.service";

@Module({
  controllers: [ChatController],
  exports: [ChatService],
  imports: [],
  providers: [ChatService],
})
export class ChatModule {};