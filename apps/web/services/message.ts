import { apiClient } from "./api";
import { MessageType } from 'types/Message.type'
import { MessageApi } from "@chsms/api-client";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { MessageDTO } from '../../api/src/app/message/dto/message.dto';

const messageApi = apiClient.use(MessageApi);

export async function createMessage(messageData: MessageDTO, replyId?: string): Promise<MessageType | null> {
  try {
    const { data } = await messageApi.messageControllerCreateMessage(replyId as string, messageData);
    return data as unknown as MessageType;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getMessagesByChatId(chatId: string, pageParam: number): Promise<MessageType[] | null> {
  try {
    const { data } = await messageApi.messageControllerGetMessagesByChatId(chatId, pageParam);

    return data as unknown as MessageType[]
  } catch  (err) {
    console.error(err)
    return null;
  }
}