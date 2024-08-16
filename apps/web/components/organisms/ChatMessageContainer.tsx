import React, { useEffect, useRef, useMemo, useState } from 'react'
import { useRouter } from 'next/router';
import useDebounce from '../../hooks/useDebounce';
import ChatMessageBody from '../atoms/ChatMessageBody';
import ChatMessageHeader from '../atoms/ChatMessageHeader';
import ChatMessageFooter from '../atoms/ChatMessageFooter';
import { useInView } from 'react-intersection-observer';
import { useGetMessagesInfinite } from '../../hooks/messageQuery';
import { useWebSocketMessage } from '../../hooks/useWebSocketMessage';
import { useChatContext } from '../../context/ChatContext';

export default function ChatMessageContainer(): JSX.Element {
  const pageSize = 20;
  const router = useRouter();
  const { id } = router.query;
  const chatId = Array.isArray(id) ? id[0] : id || '';
  const { inputRef, fetchingOldMssgs, setFetchingOldMssgs } = useChatContext();
  const { ref, inView } = useInView();
  const { 
    data: fetchedMessagesPages, 
    fetchNextPage,
    hasNextPage,
    isLoading
  } = useGetMessagesInfinite(chatId, pageSize);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const debouncedScrollPosition = useDebounce(scrollPosition.toString(), 100);
  const realtimeMessages = useWebSocketMessage(chatId);
  
  const allMessages = useMemo(() => {
    const allMessage = fetchedMessagesPages?.pages.flatMap(page => page) || [];
    // in real time chat sort mssg by date to have correct order
    //  when sending multiple messages
    return [...realtimeMessages, ...allMessage].sort((a, b) => {
      return new Date(b.timestamp._seconds).getTime() - new Date(a.timestamp._seconds).getTime();
    });
  }, [realtimeMessages, fetchedMessagesPages]);

  function handleFocus() {
    inputRef.current?.focus();
  }

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
    if (inView && hasNextPage) {
      setFetchingOldMssgs(true);
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, setFetchingOldMssgs]);

  useEffect(() => { 
    if (scrollerRef.current && !fetchingOldMssgs) {
      scrollerRef.current?.scrollTo({
        top: scrollerRef.current.scrollHeight
      });
    }
  }, [allMessages, fetchingOldMssgs]);

  return (
    <div onClick={handleFocus} className='w-full h-full rounded-lg'>
      <div className='p-2 bg-stone-700/20 h-full'>
        <div className='flex flex-col h-full'>
          <ChatMessageHeader />
          <div 
            className='flex-1 p-2 pr-2 overflow-auto' 
            ref={scrollerRef}
          >
            <ChatMessageBody 
              innerRef={ref}
              isLoading={isLoading}
              isAtBottom={isAtBottom}
              scrollToBottom={scrollToBottom}
              fetchedMessages={allMessages}
            />
          </div>
          <ChatMessageFooter chatId={chatId}/>
        </div>
      </div>
    </div>
  )
}

