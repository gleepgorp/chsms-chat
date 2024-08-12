import React from 'react'
import { useRouter } from 'next/router';
import ChatMessageHeader from '../atoms/ChatMessageHeader';
import ChatMessageFooter from '../atoms/ChatMessageFooter';
import { useGetMessagesByChatId } from '../../hooks/messageQuery';
import ChatMessageBody from '../atoms/ChatMessageBody';
import { useWebSocketMessage } from '../../hooks/useWebSocketMessage';

export default function ChatMessageContainer(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;
  const chatId = Array.isArray(id) ? id[0] : id || '';
  const { data: fetchedMessages, isLoading } = useGetMessagesByChatId(chatId);
  const realtimeMessages = useWebSocketMessage(chatId);
  const allMessages = [...(fetchedMessages || []), ...realtimeMessages];

  return (
    <div className='w-full h-full rounded-lg'>
      <div className='p-2 bg-stone-700/20 h-full'>
        <div className='flex flex-col h-full'>
          <ChatMessageHeader />
          <div className='flex-1 p-2 overflow-auto' id='scroller'>
            <ChatMessageBody 
              fetchedMessages={allMessages}
              isLoading={isLoading}
            />
            <div id="anchor"></div>
          </div>
          <div className='p-2'>
            <ChatMessageFooter chatId={chatId}/>
          </div>
        </div>
      </div>
    </div>
  )
}

