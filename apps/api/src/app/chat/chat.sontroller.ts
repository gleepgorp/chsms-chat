import { ChatType } from "types/Chat.type";
import { Controller, Get, Post, Param, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ChatService } from "./chat.service";
import { CreateChatDTO } from "./dto/createChat.dto";

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  createChat(@Body() post: CreateChatDTO): Promise<ChatType> {
    return this.chatService.createChat(post);
  }

  @Get(':id')
  getChatsByUserId(@Param('id') userId: string): Promise<ChatType[]> {
    return this.chatService.getChatsByUserId(userId);
  }
}