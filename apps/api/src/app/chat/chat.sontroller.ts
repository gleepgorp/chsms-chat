import { ChatType } from "types/Chat.type";
import { Controller, Get, Post, Param, Body, Query, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ChatService } from "./chat.service";
import { CreateChatDTO } from "./dto/createChat.dto";

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  async createChat(@Body() post: CreateChatDTO): Promise<ChatType> {
    return this.chatService.createChat(post);
  }

  @Get(':id')
  async getChatsByUserId(@Param('id') userId: string): Promise<ChatType[]> {
    return this.chatService.getChatsByUserId(userId);
  }

  @Get('getChat/:chatId')
  async getChatById(@Param('chatId') chatId: string): Promise<ChatType> {
    return this.chatService.getChatById(chatId);
  }

  @Get()
  async getChatByParticipants(
    @Query('senderId') senderId: string,
    @Query('recipients') recipients: string
  ): Promise<ChatType | null> {
    const recipientsArray = recipients.split(',');
    return this.chatService.getChatByParticipants(senderId, recipientsArray);
  }

  @Delete(':chatId')
  async deleteChatAndMessagesByChatId(@Param('chatId') chatId: string): Promise<void> {
    return this.chatService.deleteChatAndMessagesByChatId(chatId);
  } 
}