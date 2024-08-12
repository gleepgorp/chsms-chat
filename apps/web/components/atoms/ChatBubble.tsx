import React from 'react';
import { useAuth } from '../../context';
import Tooltip from './Tooltip';
import ChatProfilePicture from './ChatProfilePicture';
import { useChatContext } from '../../context/ChatContext';
import { dateAndTime } from '../../utils';

type ChatBubbleProps = {
  message?: string;
  senderId?: string;
  timestamp?: string;
}

export default function ChatBubble(props: ChatBubbleProps) {
  const { message, senderId, timestamp } = props;
  const { user } = useAuth();
  const isSender = senderId === user?.uid;
  const { firstnameInitial, lastnameInitial, profile } = useChatContext();
  
  return (
    <>
      <div className={`flex items-center ${isSender ? 'justify-end' : 'justify-start'}`}>
        <div className='flex flex-row gap-2 items-center'>
          {!isSender && 
            <div className='text-sm'>
              <ChatProfilePicture
                firstnameInitial={firstnameInitial}
                lastnameInitial={lastnameInitial}
                profile={profile}
                variant='xs'
              />
            </div>
          } 
          <Tooltip
            size='sm'
            content={dateAndTime(timestamp || '').formatted}
            paddingSize='sm'
            placement={isSender ? 'left' : 'right'}
          >
            <span className={`
                text-stone-100 text-sm
                ${isSender ? 'bg-chsms-orange' : 'bg-stone-500/40'}
                  py-1.5 px-3  rounded-full
                  flex items-center
              `}>
              {message}
            </span>
          </Tooltip>
        </div>
      </div>
    </>
  ) 
}

