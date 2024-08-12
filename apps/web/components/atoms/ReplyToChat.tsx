import React from 'react'
import { BsFillReplyFill } from "react-icons/bs";
import Tooltip from './Tooltip';

export default function ReplyToChat() {
  return (
    <Tooltip
      content='Reply'
      placement='top'
      size='xs'
    >
      <div className='bg-stone-500/40 p-1 rounded-full cursor-pointer hover:bg-stone-400/50'>
        <BsFillReplyFill className='text-[18px] flex'/>
      </div>
    </Tooltip>
  )
}

