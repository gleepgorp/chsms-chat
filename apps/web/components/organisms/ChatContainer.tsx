import React from 'react'
import ChatDetails from '../molecules/ChatDetails'
import TextInput from '../atoms/TextInput'
import { IoSearchSharp } from "react-icons/io5";

export default function ChatContainer() {
  return (
    <div className='min-w-[400px] max-w-[480px] h-full flex-1 p-4'>
      <div className='bg-stone-700/20 h-full rounded-lg p-4 flex flex-col gap-3'>
        <div className='flex flex-col gap-3'>
          <span className='text-stone-100 font-bold text-xl'>Chats</span>
          <TextInput 
            placeholder='Search a chat' 
            type='text'
            adornment={<IoSearchSharp />}
            />
        </div>
        <ChatDetails />
      </div>
    </div>
  )
}

