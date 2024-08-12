import React, { useState } from 'react'
import { MessageType } from 'types/Message.type'
import ChatBubble from './ChatBubble';
import JumpToCurrentMessage from '../atoms/JumpToCurrentMessage';
import { convertTimestamp, dateAndTime, isVisibleTimestamp } from '../../utils';
import { useAuth } from '../../context';

type ChatMessageBodyProps = {
  fetchedMessages: MessageType[]  
  isLoading: boolean;
  scrollToBottom?: () => void;
  isAtBottom?: boolean;
}

export default function ChatMessageBody(props: ChatMessageBodyProps): JSX.Element {
  const { fetchedMessages, isLoading, isAtBottom, scrollToBottom } = props;
  const { user } = useAuth();

  const mappedMessages = fetchedMessages.map((data, index) => {
    const showTimeStamp = isVisibleTimestamp(data, fetchedMessages[index - 1], 'timestamp');
    const isSender = data.senderId === user?.uid;
    const allowGap = isVisibleTimestamp(data, fetchedMessages[index - 1], 'gap');
    const isProfileVisible = isVisibleTimestamp(data, fetchedMessages[index - 1], 'profile', user?.uid);
    
    return (
      <div key={data.id || index} className={`${allowGap ? 'mt-8' : 'mt-0.5'}`}>
        {showTimeStamp && 
          <div className='flex flex-col items-center py-2'>
            <span className='text-xs text-stone-500 font-semibold'>
              {dateAndTime(data.timestamp).formatted}
            </span>
          </div>
        }
        <ChatBubble 
          message={data.content}
          senderId={data.senderId}
          isProfileVisible={isProfileVisible}
          placement={isSender ? 'left' : 'right'}
          timestamp={convertTimestamp(data.timestamp).date.toLocaleString()}
        />
      </div>
    )
  })

  return (
    <div className='text-stone-100 text-4xl max-h-[820px]'>
      <div className='flex flex-col'>
        {mappedMessages}
      </div>
      <JumpToCurrentMessage 
        isVisible={!isAtBottom}
        scrollToBottom={scrollToBottom}
      />
    </div>
  )
} 

