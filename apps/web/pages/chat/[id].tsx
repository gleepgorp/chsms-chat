import React, { useEffect, useMemo } from 'react'
import { useAuth } from '../../context';
import { useGetChatsByUserId } from '../../hooks';
import ChatLayout from '../../layout/ChatLayout'
import { useWebSocketChats } from '../../hooks/useWebSocketChats';
import { useRouter } from 'next/router';
import { ChatType } from 'types/Chat.type';
import { useInView } from 'react-intersection-observer';

export default function Messages() {
  const { user } = useAuth();
  const router = useRouter();
  const { ref, inView } = useInView();
  const pageSize = 20;
  const { 
    data: fetchedChats, 
    isLoading,
    fetchNextPage,
    hasNextPage } = useGetChatsByUserId(user?.uid as string, pageSize);
  
  const allChats = useMemo(() => {
    if (fetchedChats) {
      return fetchedChats.pages.flatMap(page => page) || [];
    }
  }, [fetchedChats]);
  const { chats, joinChatRooms } = useWebSocketChats(allChats as ChatType[]);

  useEffect(() => {
    if (!user && !allChats) {
      router.push('/login');
      router.reload();
    }
  }, [user, router, allChats])
  
  useEffect(() => {
    if (allChats) {
      if (allChats.length > 0 && user) {
        const chatIds = allChats.map(chat => chat?.id);
        joinChatRooms(chatIds as string[]);
      }
    }
  }, [user, joinChatRooms, allChats]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage])

  return (
    <div className='h-screen relative'>
      <ChatLayout 
        fetchedChats={chats} 
        isLoading={isLoading}
        innerRef={ref}
      />
    </div>
  )
} 
