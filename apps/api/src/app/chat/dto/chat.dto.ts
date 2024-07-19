import { IsString, IsOptional, IsArray, ArrayMinSize, IsUUID } from "class-validator";
import { ChatEnum } from 'types/Chat.type';

export class ChatDTO {
  @IsString()
  @IsOptional()
  id?: string;

  @IsArray()
  @ArrayMinSize(2)
  participants?: string[];

  @IsString()
  type?: ChatEnum;

  @IsString()
  creatorId?: string;
  
  @IsString()
  lastMessageId?: string;

  @IsOptional()
  @IsString()
  chatName?: string;
}