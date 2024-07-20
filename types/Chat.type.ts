export enum ChatEnum {
  DIRECT = 'direct',
  GROUP = 'group',
}

export type ChatType = {
  id: string;
  participants: string[];
  lastMessageId: string;
  chatName: string;
  creatorId: string;
  type: ChatEnum;
  updatedAt: string;
}