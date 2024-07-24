import ChatLayout from "../layout/ChatLayout";
import { useAuth } from "../context";
import { useRouter } from "next/router";
import { useGetChatsByUserId } from "../hooks";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: fetchedChats, isLoading } = useGetChatsByUserId(user?.uid as string);

  useEffect(() => {
    if (!isLoading && fetchedChats && fetchedChats.length > 0) {
      const defaultChatId = fetchedChats[0].id;
      router.replace(`/chat/${defaultChatId}`);
    }
  }, [isLoading, fetchedChats, router])

  return (
    <>
      <ChatLayout 
        fetchedChats={fetchedChats || []} 
        isLoading={isLoading}
      />
    </>
  )
}   