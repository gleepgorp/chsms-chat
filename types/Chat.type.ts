import { MessageType } from "./Message.type";
import { ProfileType } from "./Profile.type";

export enum ChatEnum {
  DIRECT = 'direct',
  GROUP = 'group',
}

export type ChatType = {
  id: string;
  participants: ProfileType[];
  participantsDetails?: ProfileType[];
  lastMessageId: string;
  chatName: string;
  creatorId: string;
  type: ChatEnum;
  updatedAt: string;
  lastMessage: MessageType;
  deletedBy: string[];
  timestamp?: string;
}

export type UserGroupType = {
  user: string;
  id: string;
}