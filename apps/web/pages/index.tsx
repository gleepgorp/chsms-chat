import { useAuth } from "../context";
import { useRouter } from "next/router";
import { useGetChatsByUserId } from "../hooks";
import { useEffect } from "react";
import LoadingScreen from "../components/molecules/LoadingScreen";
import MainLayout from "../layout/MainLayout";
import { useChatContext } from "../context/ChatContext";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
const { setFetchingOldMssgs } = useChatContext();
  const { data: fetchedChats, isLoading } = useGetChatsByUserId(user?.uid as string);

  useEffect(() => {
    if (!isLoading && fetchedChats) {
      const defaultChatId = fetchedChats[0]?.id;
      router.replace(`/chat/${defaultChatId}`);
      setFetchingOldMssgs(false);
    }
  }, [isLoading, fetchedChats, router, user?.uid, setFetchingOldMssgs])

  return (
    <MainLayout>
      <div className="max-w-screen-xl mx-auto">
        <LoadingScreen />
      </div>
    </MainLayout>
  )
}   