import { useState, useEffect, useCallback, useRef } from "react";
import socket from "../utils/socket.utils";

export function useWebSocketMessage(chatId: string) {
  const [messages, setMessages] = useState<any[]>([]);
  const messageRef = useRef<any[]>([]);

  // reset messages when chatid changes
  useEffect(() => {
    setMessages([]);
    messageRef.current = [];
  }, [chatId]);

  // duplicate message checker
  const addMessage = useCallback((newMessage: any) => {
    setMessages((prevMessages) => {
      if (!messageRef.current.some(msg => msg.id === newMessage.id)) {
        messageRef.current = [...messageRef.current, newMessage];
        return [...prevMessages, newMessage];
      }

      return prevMessages; 
    });
  }, []);

  useEffect(() => {
    const handleNewMessage = (message: any) => {
      addMessage(message);
    }

    socket.emit('joinRoom', chatId);
    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.emit('leaveRoom', chatId);
    }
  }, [chatId, addMessage]);

  return messages;
}