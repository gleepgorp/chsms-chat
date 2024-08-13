import { Controller, Get, Post, Param, Body, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MessageService } from "./message.service";
import { CreateMessageDTO } from "./dto/createMessage.dto";
import { MessageType } from "types/Message.type";

@ApiTags('message')
@Controller('message')
export class MessageController {
  constructor(private messageSevice: MessageService) {}

  @Post()
  createMessage(@Body() post: CreateMessageDTO, @Query('replyId') replyId?: string): Promise<MessageType> {
    return this.messageSevice.createMessage(post, replyId);
  }

  @Get(':id')
  getMessagesByChatId(@Param('id') chatId: string): Promise<MessageType[]>{
    return this.messageSevice.getMessagesByChatId(chatId);
  }

  @Get('getMessage/:messageId')
  getMessageById(@Param('messageId') messageId: string): Promise<MessageType> {
    return this.messageSevice.getMessageById(messageId);
  }
}