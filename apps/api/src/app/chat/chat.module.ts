import { Module } from "@nestjs/common";
import { ChatController } from "./chat.sontroller";
import { SharedModule } from "../shared.module";

@Module({
  controllers: [ChatController],
  imports: [SharedModule],
})
export class ChatModule {};