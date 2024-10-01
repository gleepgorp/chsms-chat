import { ProfileType } from "./Profile.type";

export type MessageType = {
  id?: string;
  chatId?: string;
  senderId?: string;
  sender?: ProfileType;
  content?: string;
  readBy?: string;
  timestamp?: string;
  recipientId?: string;
  read?: string;
  reply?: MessageType;
  messageId?: string;
  files?: string[],
}