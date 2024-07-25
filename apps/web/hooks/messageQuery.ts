import { useQuery } from "@tanstack/react-query";
import { getMessagesByChatId } from "../services/message";

export function useGetMessagesByChatId(chatId: string) {
  return useQuery({
    queryFn: () => getMessagesByChatId(chatId),
    queryKey: ['GET_MSSG_BY_CHATID', chatId],
    enabled: !!chatId
  })
}