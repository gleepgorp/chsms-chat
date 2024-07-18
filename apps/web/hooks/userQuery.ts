import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/user";

export function useGetUserById(id: string) {
  return useQuery({
    queryFn: () => getUserById(id),
    queryKey: ['GET_USER_BY_ID', id],
    enabled: !!id
  });
}