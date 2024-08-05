import React from 'react'
import { ChatType } from 'types/Chat.type';
import MainLayout from "../layout/MainLayout";
import ChatContainer from "../components/organisms/ChatContainer";
import ChatMessageContainer from "../components/organisms/ChatMessageContainer";

type ChatLayoutProps = {
  fetchedChats: ChatType[];
  isLoading: boolean;
};

export default function ChatLayout(props: ChatLayoutProps): JSX.Element {
  const { fetchedChats, isLoading } = props;

  return (
    <MainLayout>
      <div className="h-screen flex flex-row gap-3">
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

