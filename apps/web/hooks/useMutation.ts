import { MutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from 'axios'

// eslint-disable-next-line @nx/enforce-module-boundaries
import { CreateMessageDTO } from "../../api/src/app/message/dto/createMessage.dto";
import { createMessage } from "../services/message";
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