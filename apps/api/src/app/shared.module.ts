import { Module } from "@nestjs/common";
import { UserService } from "./user/user.service";
import { MessageService } from "./message/message.service";
import { ChatService } from "./chat/chat.service";
import { FirestoreModule } from "./firestore/firestore.module";

@Module({
  imports: [FirestoreModule],
  providers: [ChatService, MessageService, UserService],
  exports: [ChatService, MessageService, UserService],
})
export class SharedModule {}