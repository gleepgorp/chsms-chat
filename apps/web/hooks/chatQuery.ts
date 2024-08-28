import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getChatByParticipants, getChatsByUserId } from "../services/chat";

export function useGetChatsByUserId(userId: string, pageSize: number) {
  return useInfiniteQuery({
    queryKey: ['GET_CHATS_INFINITE', userId],
    queryFn: ({ pageParam }) => getChatsByUserId(userId, pageSize, pageParam?.seconds, pageParam?.nanoseconds),
    initialPageParam: { seconds: undefined, nanoseconds: undefined },
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.length === pageSize) {
        const lastChat = lastPage[lastPage.length - 1];
        if (lastChat && lastChat.timestamp) {
          return {
            seconds: lastChat.timestamp._seconds,
            nanoseconds: lastChat.timestamp._nanoseconds,
          }
        }
      }
      return undefined;
    },
    enabled: !!userId 
  })
}

export function useGetChatByParticipants(senderid: string, recipients: string) {
  return useQuery({
    queryFn: () => getChatByParticipants(senderid, recipients),
    queryKey: ['GET_CHATS_BY_PARTICIPANTS', senderid, recipients],
  })
}

