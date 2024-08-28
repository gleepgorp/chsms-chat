import { IsString, IsOptional, IsArray, ArrayMinSize, IsUUID } from "class-validator";
import { ChatEnum } from 'types/Chat.type';

export class ChatDTO {
  @IsString()
  @IsOptional()
  id?: string;

  @IsArray()
  participants?: string[];

  @IsString()
  lastMessageId?: string;

  @IsString()
  @IsOptional()
  chatName?: string;

  @IsString()
  creatorId?: string;

  @IsString()
  type?: ChatEnum;

  @IsString()
  @IsOptional()
  updatedAt?: string;

  @IsString()
  @IsOptional()
  lastMessage?: string;

  @IsArray()
  deletedBy?: string[];
}