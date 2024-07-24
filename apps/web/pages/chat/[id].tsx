import React from 'react'
import { useAuth } from '../../context';
import { useGetChatsByUserId } from '../../hooks';
import ChatLayout from '../../layout/ChatLayout'

function Messages() {
  const { user } = useAuth();
  const { data: fetchedChats, isLoading } = useGetChatsByUserId(user?.uid as string);

  return (
    <>
      <ChatLayout 
        fetchedChats={fetchedChats || []} 
        isLoading={isLoading}
      />
    </>
  )
}

export default Messages