import MainLayout from "../layout/MainLayout";
import ChatContainer from "../components/organisms/ChatContainer";
import ChatMessageContainer from "../components/organisms/ChatMessageContainer";

export default function Home() {
  return (
    <MainLayout>
      <div className="h-screen flex flex-row">
        <ChatContainer />
        <ChatMessageContainer />
      </div>
    </MainLayout>
  );
} 