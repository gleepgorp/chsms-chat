import React, { useState } from 'react'
import { FaArrowDown } from "react-icons/fa6";

type JumpToCurrentMessageProps = {
  isVisible?: boolean;
  scrollToBottom?: () => void;
}

export default function JumpToCurrentMessage(props: JumpToCurrentMessageProps) {
const { isVisible, scrollToBottom } = props;
  return (
    <>
      {isVisible && 
        <div 
          onClick={scrollToBottom}
          className='z-50 flex items-center justify-center cursor-pointer sticky bottom-0'
        >
          <div className='bg-stone-600 p-2.5 rounded-full hover:bg-stone-500/80'>
            <FaArrowDown className='text-stone-400 text-[20px]'/>
          </div>
        </div>
      }
    </>
  )
}

