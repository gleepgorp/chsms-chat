import MainLayout from "../layout/MainLayout";
import ChatContainer from "../components/organisms/ChatContainer";
import ChatMessageContainer from "../components/organisms/ChatMessageContainer";
import { useAuth } from "../context";
import { useGetChatsByUserId } from "../hooks";

export default function Home() {
  const { user } = useAuth();
  const { data: fetchedChats, isLoading } = useGetChatsByUserId(user?.uid as string);

  return (
    <MainLayout>
      <div className="h-screen flex flex-row">
        <ChatContainer 
            fetchedChats={fetchedChats || []}
            isChatLoading={isLoading}
          >
          <ChatMessageContainer />
        </ChatContainer>
      </div>
    </MainLayout>
  );
}   