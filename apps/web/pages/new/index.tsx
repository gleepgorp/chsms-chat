import React, { useEffect, useMemo } from 'react'
import { useAuth } from '../../context';
import { useGetChatsByUserId } from '../../hooks';
import ChatLayout from '../../layout/ChatLayout'
import { useChatContext } from '../../context/ChatContext';
import { useRouter } from 'next/router';

export default function NewChatPage() {
  const { user } = useAuth();
  const router = useRouter();
  const newChatRoute = router.pathname.includes('/new');
  const { setIsGroup } = useChatContext();

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

  useEffect(() => {
    if (newChatRoute) {
      setIsGroup(false);
    }
  }, [newChatRoute, setIsGroup])

  return (
    <div className='h-screen'>
      <ChatLayout 
        fetchedChats={allChats} 
        isLoading={isLoading}
      />
    </div>
  ) 
}