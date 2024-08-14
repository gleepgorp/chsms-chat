import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getMessagesByChatId } from "../services/message";

export function useGetMessagesByChatId(chatId: string, pageParam: number) {
  return useQuery({
    queryFn: () => getMessagesByChatId(chatId, pageParam),
    queryKey: ['GET_MSSG_BY_CHATID', chatId],
    enabled: !!chatId
  })
}

// export function useGetMessagesInfinite(chatId: string, pageParam: number) {
//   return useInfiniteQuery({
//     queryFn: () => getMessagesByChatId(chatId, pageParam),
//     queryKey: ['GET_MSSG_BY_CHATID', chatId],
//     initialPageParam: pageParam,
//     getNextPageParam: (lastPage) => {
//       return lastPage;
//     },
//     enabled: !!chatId
//   })
// }