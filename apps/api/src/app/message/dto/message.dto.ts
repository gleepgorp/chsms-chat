import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";

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
}