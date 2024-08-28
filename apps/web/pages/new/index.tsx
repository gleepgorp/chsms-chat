import React, { useMemo } from 'react'
import { useAuth } from '../../context';
import { useGetChatsByUserId } from '../../hooks';
import ChatLayout from '../../layout/ChatLayout'
import { ChatType } from 'types/Chat.type';

export default function NewChatPage() {
  const { user } = useAuth();
  const pageSize = 20;
  const { 
    data: fetchedChats, 
    isLoading,
    fetchNextPage,
    hasNextPage } = useGetChatsByUserId(user?.uid as string, pageSize);
  
  const allChats = useMemo(() => {
    return fetchedChats?.pages.flatMap(page => page) || [];
  }, [fetchedChats]);

  return (
    <div className='h-screen'>
      <ChatLayout 
        fetchedChats={allChats as ChatType[]} 
        isLoading={isLoading}
      />
    </div>
  )
}

