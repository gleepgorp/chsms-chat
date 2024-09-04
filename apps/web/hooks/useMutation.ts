import { MutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from 'axios'

// eslint-disable-next-line @nx/enforce-module-boundaries
import { CreateMessageDTO } from "../../api/src/app/message/dto/createMessage.dto";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CreateChatDTO } from "../../api/src/app/chat/dto/createChat.dto"
import { createMessage, createMessageGroupChat } from "../services/message";
import { createChat } from "../services/chat";
import { deleteChatAndMessagesByChatId } from "../services/chat";

export const useCreateMessage = (
  mutationOptions: MutationOptions<
    any,
    AxiosError<{ message: string } >,
    { messageData: CreateMessageDTO; 
      replyId?: string; } 
  >,
) => {
  return useMutation({
    mutationFn: ({ messageData, replyId }) => createMessage(messageData, replyId),
    ...mutationOptions,
  });
};

export const useCreateMessageGroupChat = (
  mutationOptions: MutationOptions<
    any,
    AxiosError<{ message: string } >,
    { messageData: CreateMessageDTO; 
      chatId: string;
      replyId?: string; } 
  >,
) => {
  return useMutation({
    mutationFn: ({ messageData, chatId, replyId }) => createMessageGroupChat(messageData, chatId, replyId),
    ...mutationOptions,
  });
};

export const useCreateGroupChat = (
  mutationOptions: MutationOptions<
    any,
    AxiosError<{ message: string }>,
    { chatData: CreateChatDTO; }
  >,
) => {
  return useMutation({
    mutationFn: ({ chatData }) =>
    createChat(chatData),
    ...mutationOptions
  })
}

export const useDeleteChat = (
  mutationOptions: MutationOptions<
    any,
    AxiosError<{ message: string }>,
    { chatId: string }
  >
) => {
  return useMutation({
    mutationFn: ({ chatId }) => deleteChatAndMessagesByChatId(chatId),
    ...mutationOptions,
  });
}