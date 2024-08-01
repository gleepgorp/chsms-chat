import { useQuery } from "@tanstack/react-query";
import { getChatById, getChatByParticipants, getChatsByUserId } from "../services/chat";

export function useGetChatsByUserId(userId: string) {
  return useQuery({
    queryFn: () => getChatsByUserId(userId),
    queryKey: ['GET_CHATS_BY_USERID', userId],
    enabled: !!userId 
  })
}

export function useGetChatByParticipants(senderid: string, recipients: string) {
  return useQuery({
    queryFn: () => getChatByParticipants(senderid, recipients),
    queryKey: ['GET_CHATS_BY_PARTICIPANTS', senderid, recipients],
  })
}

