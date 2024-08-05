import { Module } from "@nestjs/common";
import { ChatController } from "./chat.sontroller";
import { SharedModule } from "../shared.module";
import { ChatGateway } from "./chat.gateway";

@Module({
  controllers: [ChatController],
  imports: [SharedModule],
})
export class ChatModule {};