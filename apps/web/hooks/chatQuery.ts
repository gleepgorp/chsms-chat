import { useQuery } from "@tanstack/react-query";
import { getChatsByUserId } from "../services/chat";

export function useGetChatsByUserId(userId: string) {
  return useQuery({
    queryFn: () => getChatsByUserId(userId),
    queryKey: ['GET_CHATS_BY_USERID', userId],
    enabled: !!userId 
  })
}