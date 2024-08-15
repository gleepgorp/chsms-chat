import React, { useEffect, useRef, useMemo, useState } from 'react'
import { useRouter } from 'next/router';
import ChatMessageHeader from '../atoms/ChatMessageHeader';
import ChatMessageFooter from '../atoms/ChatMessageFooter';
import { useGetMessagesByChatId, useGetMessagesInfinite } from '../../hooks/messageQuery';
import ChatMessageBody from '../atoms/ChatMessageBody';
import { useWebSocketMessage } from '../../hooks/useWebSocketMessage';
import useDebounce from '../../hooks/useDebounce';
import { useChatContext } from '../../context/ChatContext';

export default function ChatMessageContainer(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;
  const chatId = Array.isArray(id) ? id[0] : id || '';
  const { inputRef } = useChatContext();
  const pageSize = 20;
  const { 
    data: fetchedMessagesPages, 
    fetchNextPage,
    hasNextPage,
    isLoading
  } = useGetMessagesInfinite(chatId, pageSize);
  const realtimeMessages = useWebSocketMessage(chatId);
  
  const allMessages = useMemo(() => {
    const allMessage = fetchedMessagesPages?.pages.flatMap(page => page) || [];

    // in real time chat sort mssg by date to have correct order
    //  when sending multiple messages
    return [...realtimeMessages, ...allMessage].sort((a, b) => {
      return new Date(b.timestamp._seconds).getTime() - new Date(a.timestamp._seconds).getTime();
    });
  }, [realtimeMessages, fetchedMessagesPages]);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  const debouncedScrollPosition = useDebounce(scrollPosition.toString(), 100);

  function handleScroll() {
    if (scrollerRef.current) {
      const { scrollTop } = scrollerRef.current;
      setScrollPosition(scrollTop);
    }
  }

  function scrollToBottom() {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }

  function handleFocus() {
    inputRef.current?.focus();
  }

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (scroller) {
      scroller.addEventListener('scroll', handleScroll);
      return () => scroller.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    if (scrollerRef.current) {
      const { scrollHeight, clientHeight } = scrollerRef.current;
      const scrollTop = parseInt(debouncedScrollPosition);
      const atBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;
      setIsAtBottom(atBottom);
    }
  }, [debouncedScrollPosition]);

  useEffect(() => { 
    if (scrollerRef.current) {
      scrollerRef.current?.scrollTo({
        top: scrollerRef.current.scrollHeight
      });
    }
  }, [allMessages]);

  return (
    <div onClick={handleFocus} className='w-full h-full rounded-lg'>
      <div className='p-2 bg-stone-700/20 h-full'>
        <div className='flex flex-col h-full'>
          <ChatMessageHeader />
          <div 
            className='flex-1 p-2 pr-2 overflow-auto' 
            id='scroller'
            ref={scrollerRef}
          >
            <ChatMessageBody 
              isLoading={isLoading}
              isAtBottom={isAtBottom}
              scrollToBottom={scrollToBottom}
              fetchedMessages={allMessages}
            />
            <div id="anchor"></div>
          </div>
          <ChatMessageFooter chatId={chatId}/>
        </div>
      </div>
    </div>
  )
}

