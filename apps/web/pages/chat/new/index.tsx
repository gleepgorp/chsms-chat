import React from 'react'
import { useAuth } from '../../../context';
import { useGetChatsByUserId } from '../../../hooks';
import ChatLayout from '../../../layout/ChatLayout'

export default function NewChatPage() {
  const { user } = useAuth();
  const { data: fetchedChats, isLoading } = useGetChatsByUserId(user?.uid as string);

  return (
    <div className='h-screen'>
      <ChatLayout 
        fetchedChats={fetchedChats || []} 
        isLoading={isLoading}
      />
    </div>
  )
}

