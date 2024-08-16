import { Controller, Get, Post, Param, Body, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MessageService } from "./message.service";
import { CreateMessageDTO } from "./dto/createMessage.dto";
import { MessageType } from "types/Message.type";

@ApiTags('message')
@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  async createMessage(@Body() post: CreateMessageDTO, 
  @Query('replyId') replyId?: string
  ): Promise<MessageType> {
    return this.messageService.createMessage(post, replyId);
  }

  @Get(':id')
  async getMessagesByChatId(
    @Param('id') chatId: string,
    @Query('pageSize') pageSize: number,
    @Query('seconds') seconds?: string,
    @Query('nanoseconds') nanoseconds?: string
  ): Promise<MessageType[]> {
    const parsedSeconds = seconds ? parseInt(seconds, 10) : undefined;
    const parsedNanoseconds = nanoseconds ? parseInt(nanoseconds, 10) : undefined;
    return this.messageService.getMessagesByChatId(chatId, pageSize, parsedSeconds, parsedNanoseconds);
  }

  @Get('getMessage/:messageId')
  async getMessageById(@Param('messageId') messageId: string): Promise<MessageType> {
    return this.messageService.getMessageById(messageId);
  }
}