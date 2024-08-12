import React from 'react'
import { MessageType } from 'types/Message.type'
import ChatBubble from './ChatBubble';
import { convertTimestamp, dateAndTime, isVisibleTimestamp } from '../../utils';

type ChatMessageBodyProps = {
  fetchedMessages: MessageType[]  
  isLoading: boolean;
}

export default function ChatMessageBody(props: ChatMessageBodyProps): JSX.Element {
  const { fetchedMessages, isLoading } = props;

  const mappedMessages = fetchedMessages.map((data, index) => {
    const showTimeStamp = isVisibleTimestamp(data, fetchedMessages[index - 1]);
    return (
      <div key={index}>
        {showTimeStamp && 
          <div className='flex flex-col items-center'>
            <span className='text-xs text-stone-500 font-semibold'>
              {dateAndTime(data.timestamp).formatted}
            </span>
          </div>
        }
        <ChatBubble 
          message={data.content}
          senderId={data.senderId}
          timestamp={convertTimestamp(data.timestamp).date.toLocaleString()}
        />
      </div>
    )
  })

  return (
    <div className='text-stone-100 text-4xl max-h-[820px]'>
      <div className='flex gap-2 flex-col'>
        {mappedMessages}
      </div>
    </div>
  )
} 

