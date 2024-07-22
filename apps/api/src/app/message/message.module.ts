import { Module } from "@nestjs/common";
import { MessageController } from "./message.controller";
import { SharedModule } from "../shared.module";

@Module({
  controllers: [MessageController],
  imports: [SharedModule],
})
export class MessageModule {};