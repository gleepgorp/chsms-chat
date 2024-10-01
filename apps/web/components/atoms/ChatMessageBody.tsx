import React, { useState } from 'react'
import { MessageType } from 'types/Message.type'
import ChatBubble from './ChatBubble';
import JumpToCurrentMessage from '../atoms/JumpToCurrentMessage';
import { convertTimestamp, dateAndTime, extractInitials, isVisibleTimestamp } from '../../utils';
import { useAuth } from '../../context';
import LoadingSpinner from './LoadingSpinner';

type ChatMessageBodyProps = {
  fetchedMessages: MessageType[]  
  isLoading: boolean;
  scrollToBottom?: () => void;
  isAtBottom?: boolean;
  hasNextPage?: boolean;
  innerRef?: React.Ref<HTMLDivElement>;
}

export default function ChatMessageBody(props: ChatMessageBodyProps): JSX.Element {
  const { fetchedMessages, isLoading, isAtBottom, scrollToBottom, innerRef, hasNextPage } = props;
  const { user } = useAuth();

  const mappedMessages = fetchedMessages.map((data, index) => {
    // if asc index - 1, if desc index + 1
    const showTimeStamp = isVisibleTimestamp(data, fetchedMessages[index + 1], 'timestamp');
    
    const isSender = data.senderId === user?.uid;
    
    const allowGap = isVisibleTimestamp(data, fetchedMessages[index + 1], 'gap');
    
    const recipientGap = isVisibleTimestamp(data, fetchedMessages[index + 1], 'recipient');
    
    const isProfileVisible = isVisibleTimestamp(data, fetchedMessages[index + 1], 'profile', user?.uid);
    
    const lastMessage = fetchedMessages.length === index + 1;

    const isGroup = data.recipientId.length > 1;

    if (data.sender) {
      const sender = data.sender.firstname;
      const fNameInitial = extractInitials(data.sender.firstname);
      const lNameInitial = extractInitials(data.sender.lastname);
      const profileDisplay = data.sender.profilePicture ? data.sender.profilePicture : data.sender.profileBgColor;
      const profile = profileDisplay;
      
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
            isGroup={isGroup}
            reply={data.reply}
            message={data.content}
            sender={sender || ''}
            profile={profile || ''}
            senderId={data.senderId}
            messageId={data.messageId}
            fNameInitial={fNameInitial || ''}
            lNameInitial={lNameInitial || ''}
            isProfileVisible={isProfileVisible}
            placement={isSender ? 'left' : 'right'}
            timestamp={convertTimestamp(data.timestamp).date.toLocaleString()}
            files={data.files || []}
          /> 
        </div>
      )
    }
  })

  return (
    <div className='text-stone-100 text-4xl max-h-[820px]'>
      {fetchedMessages.length === 0 && !isLoading &&
        <div className='flex justify-center items-end h-[760px]'>
          <span className='text-stone-400 text-base'>Start chatting now!</span>
        </div>
      }
      <div className='flex flex-col-reverse'>
        {mappedMessages}
        <div className='mt-3'>{hasNextPage && <LoadingSpinner />}</div>
      </div>
      <JumpToCurrentMessage 
        isVisible={!isAtBottom}
        scrollToBottom={scrollToBottom}
      />
    </div>
  )
} 

