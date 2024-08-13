import React from 'react'
import { BsFillReplyFill } from "react-icons/bs";
import Tooltip from './Tooltip';

type ReplyToChatProps = {
  onClickReply: () => void;
}

export default function ReplyToChat(props: ReplyToChatProps) {
  const { onClickReply } = props;
  return (
    <Tooltip
      content='Reply'
      placement='top'
      size='xs'
    >
      <div 
        onClick={onClickReply}
        className='bg-stone-500/40 p-1 rounded-full cursor-pointer hover:bg-stone-400/50'
      >
        <BsFillReplyFill className='text-[18px] flex'/>
      </div>
    </Tooltip>
  )
}

