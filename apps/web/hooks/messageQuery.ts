import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessagesByChatId } from "../services/message";

export function useGetMessagesInfinite(chatId: string, pageSize: number) {
  return useInfiniteQuery({
    queryKey: ['GET_MSSGES_INFINITE', chatId],
    queryFn: ({ pageParam }) => getMessagesByChatId(chatId, pageSize, pageParam?.seconds, pageParam?.nanoseconds),
    initialPageParam: { seconds: undefined, nanoseconds: undefined },
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.length === pageSize) {
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