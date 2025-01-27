import { apiClient } from "./api";
import { ChatType } from 'types/Chat.type';
import { ChatApi } from "@chsms/api-client";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CreateChatDTO } from "apps/api/src/app/chat/dto/createChat.dto";

const chatApi = apiClient.use(ChatApi);

export async function getChatsByUserId(userId: string, pageSize = 20, seconds?: string, nanoseconds?: string): Promise<ChatType[] | null> {
  try {
    const { data } = await chatApi.chatControllerGetChatsByUserId(userId, pageSize, seconds || '', nanoseconds || '');

    return data as unknown as ChatType[];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getChatByParticipants(senderId: string, recipients: string): Promise<ChatType | null> {
  try {
    const { data } = await chatApi.chatControllerGetChatByParticipants(senderId, recipients)

    return data as unknown as ChatType;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getChatById(chatId: string): Promise<ChatType | null> {
  try {
    const { data } = await chatApi.chatControllerGetChatById(chatId);

    return data as unknown as ChatType;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deleteChatAndMessagesByChatId(chatId: string): Promise<void> {
  try {
    await chatApi.chatControllerDeleteChatAndMessagesByChatId(chatId);
  } catch (err) {
    console.error(err);
  }
}

export async function createChat(chatData: CreateChatDTO): Promise<ChatType | null> {
  try {
    const { data } = await chatApi.chatControllerCreateChat(chatData);

    return data as unknown as ChatType;
  } catch (err) {
    console.error(err);
    return null;
  }
}