import { useCallback, useEffect, useState } from "react";
import socket from "../utils/socket.utils";

export function useWebSocketChat(userId: string) {
  const [lastMessages, setLastMessages] = useState<{[chatId: string]: string}>({});

  useEffect(() => {
    // Join user's room
    socket.emit('joinUserRoom', userId);

    // Listen for last message updates
    socket.on('updateLastMessage', ({ chatId, lastMessage }) => {
      setLastMessages((prev) => ({ ...prev, [chatId]: lastMessage }));
    });

    // Cleanup on unmount
    return () => {
      socket.off('newMessage');
      socket.off('updateLastMessage');
      socket.emit('leaveUserRoom', userId);
    };
  }, [userId]);

  return lastMessages;
}