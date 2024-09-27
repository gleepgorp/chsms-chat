import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";
import { MessageType } from "types/Message.type";

export class MessageDTO {
  @IsString()      
  content?: string;

  @IsString()
  @IsOptional()
  chatId?: string;

  @IsString()
  senderId?: string;

  @IsArray()
  @IsOptional()
  readBy?: string[];

  @IsArray()
  recipientId?: string[];

  @IsBoolean()
  read?: boolean;

  @IsString()
  @IsOptional()
  reply?: MessageType;

  @IsOptional()
  messageId?: string;

  @IsArray()
  @IsOptional()
  deletedBy?: string[];

  @IsArray()
  @IsOptional()
  files?: string[];
}