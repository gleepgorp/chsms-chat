import { MutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from 'axios'

// eslint-disable-next-line @nx/enforce-module-boundaries
import { CreateMessageDTO } from "../../api/src/app/message/dto/createMessage.dto";
import { createMessage } from "../services/message";

export const useCreateMessage = (
  mutationOptions: MutationOptions<
    any,
    AxiosError<{ message: string }>,
    {messageData: CreateMessageDTO; } 
  >,
) => {
  return useMutation({
    mutationFn: ({ messageData }) => createMessage(messageData),
    ...mutationOptions,
  });
};