import React, { useMemo } from 'react'
import { useAuth } from '../../context';
import { useGetChatsByUserId } from '../../hooks';
import ChatLayout from '../../layout/ChatLayout'

export default function NewChatPage() {
  const { user } = useAuth();
  const { 
    data: fetchedChats, 
    isLoading,
    fetchNextPage,
    hasNextPage } = useGetChatsByUserId(user?.uid as string, 20);
  
  const allChats = useMemo(() => {
    if (fetchedChats) {
      return fetchedChats.pages.flatMap(page => page) || [];
    }
  }, [fetchedChats]);

  return (
    <div className='h-screen'>
      <ChatLayout 
        fetchedChats={allChats} 
        isLoading={isLoading}
      />
    </div>
  )
}