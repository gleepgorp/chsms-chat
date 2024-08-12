import { useState, useEffect, useCallback, useRef } from "react";
import socket from "../utils/socket.utils";
import { ChatType } from "types/Chat.type";

export function useWebSocketChats(initialChats: ChatType[]) {
  const [chats, setChats] = useState<ChatType[]>(initialChats);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  useEffect(() => {
    setChats(initialChats);
  }, [initialChats]);

  useEffect(() => {
    const handleChatUpdate = (updatedChat: ChatType) => {
      if (isMounted.current) {
        setChats(prevChats => prevChats.map(chat => 
          chat.id === updatedChat.id ? updatedChat : chat
        ));
      }
    };

    const handleNewChat = (newChat: ChatType) => {
      if (isMounted.current) {
        setChats(prevChats => {
          if(!prevChats.some(chat => chat.id === newChat.id)) {
            return [newChat, ...prevChats];
          }
          return prevChats;
        });
      }
    }

    socket.on('chatUpdated', handleChatUpdate);
    socket.on('newChat', handleNewChat);

    return () => {
      socket.off('chatUpdated', handleChatUpdate);
      socket.off('newChat', handleNewChat);
    };
  }, []);

  const joinChatRooms = useCallback((chatIds: string[]) => {
    chatIds.forEach(chatId => {
      socket.emit('joinRoom', chatId);
    });
  }, []);

  return { chats, joinChatRooms };
}