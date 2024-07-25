import React from 'react'
import { MessageType } from 'types/Message.type'
import ChatBubble from './ChatBubble';
import { convertTimestamp } from '../../utils';

type ChatMessageBodyProps = {
  fetchedMessages: MessageType[]  
  isLoading: boolean;
}

export default function ChatMessageBody(props: ChatMessageBodyProps): JSX.Element {
  const { fetchedMessages, isLoading } = props;

  const mappedMessages = fetchedMessages.map((data, index) => {
    return (
      <div key={index}>
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

