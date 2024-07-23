import { apiClient } from "./api";
import { ChatType } from 'types/Chat.type';
import { ChatApi } from "@chsms/api-client";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ChatDTO } from '../../api/src/app/chat/dto/chat.dto';

const chatApi = apiClient.use(ChatApi);

export async function getChatsByUserId(userId: string): Promise<ChatType[] | null> {
  try {
    const { data } = await chatApi.chatControllerGetChatsByUserId(userId);

    return data as unknown as ChatType[];
  } catch (err) {
    console.error(err);
    return null;
  }
}