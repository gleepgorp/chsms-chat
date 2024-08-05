import { useState, useEffect, useCallback } from "react";
import socket from "../utils/socket.utils";

export function useWebSocketMessage(chatId: string) {
  const [messages, setMessages] = useState<any[]>([]);

  // reset messages when chatid changes
  useEffect(() => {
    setMessages([]);
  }, [chatId]);

  // duplicate message checker
  const addMessage = useCallback((newMessage: any) => {
    setMessages((prevMessages) => {
      const messageExists = prevMessages.some(msg => msg.id === newMessage.id);
      if (messageExists) {
        return prevMessages;
      }
      return [...prevMessages, newMessage];
    });
  }, []);

  useEffect(() => {
    socket.emit('joinRoom', chatId);
    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    });

    return () => {
      socket.off('newMessage');
      socket.emit('leaveRoom', chatId);
    }
  }, [chatId, addMessage]);

  return messages;
}