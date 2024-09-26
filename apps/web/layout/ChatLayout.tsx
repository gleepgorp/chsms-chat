import React from 'react'
import { ChatType } from 'types/Chat.type';
import MainLayout from "../layout/MainLayout";
import ChatContainer from "../components/organisms/ChatContainer";
import ChatMessageContainer from "../components/organisms/ChatMessageContainer";

type ChatLayoutProps = {
  fetchedChats: ChatType[];
  isLoading: boolean;
  innerRef?: React.Ref<HTMLDivElement>;
};

export default function ChatLayout(props: ChatLayoutProps): JSX.Element {
  const { fetchedChats, isLoading, innerRef } = props;

  return (
    <MainLayout>
      <div className="h-screen flex gap-3">
        <ChatContainer 
            fetchedChats={fetchedChats || []}
            isChatLoading={isLoading}
            innerRef={innerRef}
          >
          <ChatMessageContainer />
        </ChatContainer>  
      </div>
    </MainLayout>
  );
}

