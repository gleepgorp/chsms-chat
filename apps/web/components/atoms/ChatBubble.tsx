import React from 'react';
import { useAuth } from '../../context';
import Tooltip from './Tooltip';
import ChatProfilePicture from './ChatProfilePicture';
import { useChatContext } from '../../context/ChatContext';
import { dateAndTime } from '../../utils';
import ReplyToChat from './ReplyToChat';
import { TipPlacement } from './TooltipContent';

type ChatBubbleProps = {
  message?: string;
  senderId?: string;
  timestamp?: string;
  isProfileVisible?: boolean;
  placement: TipPlacement;
}

const placementClass: Record<TipPlacement, string> = {
  left: 'right-full px-2 top-1/2 -translate-y-1/2 mr-1',
  right: 'left-full px-2 top-1/2 -translate-y-1/2 mr-1',
  top: '',
  bottom: ''
}

export default function ChatBubble(props: ChatBubbleProps) {
  const { message, senderId, timestamp, isProfileVisible, placement } = props;
  const { user } = useAuth();
  const isSender = senderId === user?.uid;
  const { firstnameInitial, lastnameInitial, profile } = useChatContext();
  
  return (
    <>
      <div className={`flex group items-center ${isSender ? 'justify-end' : 'justify-start'}`}>
        <div className='flex relative flex-row gap-2 items-center group'>
          {!isSender && 
            <div className={`
                text-sm 
                ${isProfileVisible ? 'opacity-1' : 'opacity-0'}
              `}
            >
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
          <div className={`
              absolute hidden group-hover:inline-block
              ${placementClass[placement]}
            `}>
            <ReplyToChat />
          </div>
        </div>
      </div>
    </>
  ) 
}

