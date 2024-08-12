import { ProfileType } from "./Profile.type";

export type MessageType = {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  readBy: string;
  timestamp: string;
  recipientId: ProfileType;
  read: string;
}