import React, { useState } from 'react'
import { MessageType } from 'types/Message.type'
import ChatBubble from './ChatBubble';
import JumpToCurrentMessage from '../atoms/JumpToCurrentMessage';
import { convertTimestamp, dateAndTime, isVisibleTimestamp } from '../../utils';
import { useAuth } from '../../context';
import LoadingSpinner from './LoadingSpinner';

type ChatMessageBodyProps = {
  fetchedMessages: MessageType[]  
  isLoading: boolean;
  scrollToBottom?: () => void;
  isAtBottom?: boolean;
  isFetchingNextPage?: boolean;
  innerRef?: React.Ref<HTMLDivElement>;
}

export default function ChatMessageBody(props: ChatMessageBodyProps): JSX.Element {
  const { fetchedMessages, isLoading, isAtBottom, scrollToBottom, innerRef, isFetchingNextPage } = props;
  const { user } = useAuth();

  const mappedMessages = fetchedMessages.map((data, index) => {
    // if asc index - 1, if desc index + 1
    const showTimeStamp = isVisibleTimestamp(data, fetchedMessages[index + 1], 'timestamp');
    const isSender = data.senderId === user?.uid;
    const allowGap = isVisibleTimestamp(data, fetchedMessages[index + 1], 'gap');
    const recipientGap = isVisibleTimestamp(data, fetchedMessages[index + 1], 'recipient');
    const isProfileVisible = isVisibleTimestamp(data, fetchedMessages[index + 1], 'profile', user?.uid);
    const lastMessage = fetchedMessages.length === index + 1;

    return (
      <div  
        ref={lastMessage ? innerRef : null}
        key={data.id || index} 
        className={`
          ${allowGap ? 'mt-8' : 'mt-0.5'}
          ${recipientGap ? 'mt-4' : ''}
        `}
      >
        {showTimeStamp && 
          <div className='flex flex-col items-center py-2'>
            <span className='text-xs text-stone-500 font-semibold'>
              {dateAndTime(data.timestamp).formatted}
            </span>
          </div>
        }
        <ChatBubble 
          reply={data?.reply}
          message={data.content}
          senderId={data.senderId}
          messageId={data.messageId}
          isProfileVisible={isProfileVisible}
          placement={isSender ? 'left' : 'right'}
          timestamp={convertTimestamp(data.timestamp).date.toLocaleString()}
        /> 
      </div>
    )
  })

  return (
    <div className='text-stone-100 text-4xl max-h-[820px]'>
      <div className='flex flex-col-reverse'>
        {mappedMessages}
        <div className='mt-3'>{isFetchingNextPage && <LoadingSpinner />}</div>
      </div>
      <JumpToCurrentMessage 
        isVisible={!isAtBottom}
        scrollToBottom={scrollToBottom}
      />
    </div>
  )
} 

