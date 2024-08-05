import { Module } from "@nestjs/common";
import { UserService } from "./user/user.service";
import { MessageService } from "./message/message.service";
import { ChatService } from "./chat/chat.service";
import { FirestoreModule } from "./firestore/firestore.module";
import { WebSocketModule } from "./websocket.module";

@Module({
  imports: [FirestoreModule, WebSocketModule],
  providers: [ChatService, MessageService, UserService],
  exports: [ChatService, MessageService, UserService, WebSocketModule],
})
export class SharedModule {}