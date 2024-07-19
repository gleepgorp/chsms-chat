import { ArrayMinSize, IsArray, IsOptional, IsString } from "class-validator";

export class MessageDTO {
  @IsString()      
  content?: string;

  @IsString()
  chatId?: string;

  @IsString()
  senderId?: string;

  @IsArray()
  @IsOptional()
  @ArrayMinSize(2)
  readBy?: string[];
}