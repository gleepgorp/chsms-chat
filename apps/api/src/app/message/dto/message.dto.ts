import { IsArray, IsOptional, IsString } from "class-validator";

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
}