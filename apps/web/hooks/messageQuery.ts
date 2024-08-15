import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getMessagesByChatId } from "../services/message";

export function useGetMessagesByChatId(chatId: string, pageSize: number, seconds?: string, nanoseconds?: string) {
  return useQuery({
    queryFn: () => getMessagesByChatId(chatId, pageSize, seconds, nanoseconds),
    queryKey: ['GET_MSSG_BY_CHATID', chatId],
    enabled: !!chatId
  })
}

export function useGetMessagesInfinite(chatId: string, pageSize: number) {
  return useInfiniteQuery({
    queryKey: ['GET_MSSGES_BY_CHATID', chatId],
    queryFn: ({ pageParam }) => getMessagesByChatId(chatId, pageSize, pageParam?.seconds, pageParam?.nanoseconds),
    initialPageParam: { seconds: undefined, nanoseconds: undefined },
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.length > 0) {
        const lastMessage = lastPage[lastPage.length - 1];
        if (lastMessage && lastMessage.timestamp) {
          return {
            seconds: lastMessage.timestamp._seconds,
            nanoseconds: lastMessage.timestamp._nanoseconds
          };
        }
      }
      return undefined;
    },
    enabled: !!chatId,
  });
}