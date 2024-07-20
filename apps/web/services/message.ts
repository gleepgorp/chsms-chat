import { apiClient } from "./api";
import { MessageType } from 'types/Message.type'
import { MessageApi } from "@chsms/api-client";
import { MessageDTO } from '../../api/src/app/message/dto/message.dto';

const messageApi = apiClient.use(MessageApi);

export async function createMessage(messageData: MessageDTO): Promise<MessageType | null> {
  try {
    const { data } = await messageApi.messageControllerCreateMessage(messageData);
    return data as unknown as MessageType;
  } catch (err) {
    console.error(err);
    return null;
  }
}