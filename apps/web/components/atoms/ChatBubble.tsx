import React, { RefObject } from 'react';
import { useAuth } from '../../context';
import Tooltip from './Tooltip';
import ChatProfilePicture from './ChatProfilePicture';
import { useChatContext } from '../../context/ChatContext';
import { dateAndTime } from '../../utils';
import ReplyToChat from './ReplyToChat';
import { TipPlacement } from './TooltipContent';
import { useReplyContext } from '../../context/ReplyContext';
import ReplyElement from './ReplyElement';

type ChatBubbleProps = {
  message?: string;
  senderId?: string;
  timestamp?: string;
  isProfileVisible?: boolean;
  placement: TipPlacement;
  messageId?: string;
  reply?: string;
  sender: string;
  fNameInitial: string;
  lNameInitial: string;
  profile: string
  isGroup: boolean;
  innerRef?: React.Ref<HTMLDivElement>;
}

const placementClass: Record<TipPlacement, string> = {
  left: 'right-full px-2 top-1/2 -translate-y-1/2 mr-1',
  right: 'left-full px-2 top-1/2 -translate-y-1/2 mr-1',
  top: '',
  bottom: ''
}

export default function ChatBubble(props: ChatBubbleProps) {
  const { message, senderId, timestamp, isProfileVisible, placement, messageId, reply, innerRef, sender, profile: profileDisplay, fNameInitial, lNameInitial, isGroup } = props;
  const { user } = useAuth();
  const isSender = senderId === user?.uid;
  const { firstname, lastname } = useChatContext();
  const { setRecipient, setMessageReplied, setRecipientId, setMessageId } = useReplyContext();

  function handleReply() {
    const chatRecipient = `${firstname} ${lastname}`;
    setRecipient(chatRecipient);
    setMessageReplied(message || '');
    setRecipientId(senderId || '');
    setMessageId(messageId || '');
  }
  
  return (
    <>
      <div ref={innerRef} className={`flex group items-center ${isSender ? 'justify-end' : 'justify-start'}`}>
        <div className='flex relative flex-row gap-2 items-end group'>
          {!isSender && 
            <div className={`
                text-sm 
                ${isProfileVisible ? 'opacity-1' : 'opacity-0'}
              `}
            >
              <ChatProfilePicture
                firstnameInitial={fNameInitial}
                lastnameInitial={lNameInitial}
                profile={profileDisplay}
                variant='xs'
              />
            </div>
          } 
          <div className={`flex flex-col ${isSender ? 'items-end' : 'items-start'}`}>
            {!isSender && isGroup &&  <span className='text-stone-300/70 text-xs py-1 capitalize'>{sender}</span> }
            {reply && 
              <ReplyElement 
                reply={reply}
                isSender={isSender}
              />
            }
            <div className={`
                text-stone-100 text-sm
                flex items-center w-fit 
                rounded-xl
                ${reply && isSender ? 'rounded-tr' : ''}
                ${reply && !isSender ? 'rounded-tl' : ''}
                ${isSender ? 'bg-chsms-orange' : 'bg-stone-500/40'}
              `}
            >
              <Tooltip placement={isSender ? 'left' : 'left'}>
                <Tooltip
                  size='sm'
                  paddingSize='sm'
                  content={dateAndTime(timestamp || '').formatted}
                  placement={isSender ? 'left' : 'right'}
                >
                  <div className='py-1.5 px-3'>{message}</div>
                </Tooltip>
                <div className={`
                  absolute hidden z-20
                  group-hover:inline-block
                  ${placementClass[placement]}
                `}>
                <ReplyToChat onClickReply={handleReply}/>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  ) 
}

