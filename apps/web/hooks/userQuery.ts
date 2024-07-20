import { useQuery } from "@tanstack/react-query";
import { getUserById, searchUsers } from "../services/user";

export function useGetUserById(id: string) {
  return useQuery({
    queryFn: () => getUserById(id),
    queryKey: ['GET_USER_BY_ID', id],
    enabled: !!id
  });
}

export function useSearchUser(query: string) {
  return useQuery({
    queryFn: () => searchUsers(query),
    queryKey: ['SEARCH_USER', query],
  })
}