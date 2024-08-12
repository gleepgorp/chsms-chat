import React, { useEffect } from 'react'
import { useAuth } from '../../context';
import { useGetChatsByUserId } from '../../hooks';
import ChatLayout from '../../layout/ChatLayout'
import { useWebSocketChats } from '../../hooks/useWebSocketChats';
import { useRouter } from 'next/router';

function Messages() {
  const { user } = useAuth();
  const router = useRouter();
  const { data: fetchedChats, isLoading } = useGetChatsByUserId(user?.uid as string);
  const { chats, joinChatRooms } = useWebSocketChats(fetchedChats || []);

  useEffect(() => {
    if (!user && !fetchedChats) {
      router.push('/login');
      router.reload();
    }
  }, [user, router, fetchedChats])
  
  useEffect(() => {
    if (fetchedChats && user) {
      const chatIds = fetchedChats.map(chat => chat.id);
      joinChatRooms(chatIds);
    }
  }, [fetchedChats, user, joinChatRooms]);

  return (
    <div className='h-screen'>
      <ChatLayout 
        fetchedChats={chats} 
        isLoading={isLoading}
      />
    </div>
  )
} 

export default Messages