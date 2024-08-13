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
          className='z-50 flex items-center justify-center sticky bottom-0'
        >
          <div 
            onClick={scrollToBottom}
            className='bg-stone-600 p-2.5 rounded-full hover:bg-stone-500/80 cursor-pointer'
          >
            <FaArrowDown className='text-stone-400 text-[20px]'/>
          </div>
        </div>
      }
    </>
  )
}

