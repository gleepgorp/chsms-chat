import { useAuth } from "../context";
import { useRouter } from "next/router";
import { useGetChatsByUserId } from "../hooks";
import { useEffect, useMemo } from "react";
import LoadingScreen from "../components/molecules/LoadingScreen";
import MainLayout from "../layout/MainLayout";
import { useChatContext } from "../context/ChatContext";

export default function Home() {
  const pageSize = 20;
  const router = useRouter();
  const { user } = useAuth();
  const { setFetchingOldMssgs } = useChatContext();
  const { 
    data: fetchedChats, 
    isLoading,
    fetchNextPage,
    hasNextPage } = useGetChatsByUserId(user?.uid as string, pageSize);
  
  const allChats = useMemo(() => {
    return fetchedChats?.pages.flatMap(page => page) || [];
  }, [fetchedChats]);

  useEffect(() => {
    if (!isLoading && allChats) {
      const defaultChatId = allChats[0]?.id;
      router.replace(`/chat/${defaultChatId}`);
      setFetchingOldMssgs(false);
    }
  }, [isLoading, allChats, router, user?.uid, setFetchingOldMssgs, fetchedChats])

  return (
    <MainLayout>
      <div className="max-w-screen-xl mx-auto">
        <LoadingScreen />
      </div>
    </MainLayout>
  )
}   