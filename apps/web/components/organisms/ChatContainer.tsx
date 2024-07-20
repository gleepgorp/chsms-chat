import React, { useState } from 'react'
import ChatDetails from '../molecules/ChatDetails'
import TextInput from '../atoms/TextInput'
import { IoSearchSharp } from "react-icons/io5";
import NewChat from '../molecules/NewChat';
import { useSearchUser } from 'apps/web/hooks';
import useDebounce from 'apps/web/hooks/useDebounce';

export default function ChatContainer(): JSX.Element {
  const debouncedDelay = 200;
  const [searchItem, setSearchItem] = useState<string>("");
  const searchItemDebounced = useDebounce(searchItem, debouncedDelay);
  const { data, isLoading, error } = useSearchUser(searchItemDebounced);

  return (
    <div className='min-w-[400px] max-w-[480px] h-full flex-1 p-2.5'>
      <div className='bg-stone-700/20 h-full rounded-lg p-2.5 flex flex-col gap-3'>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-row items-center justify-between'>
            <span className='text-stone-100 font-bold text-xl'>Chats</span>
            <NewChat />
          </div>
          <TextInput 
            type='text'
            value={searchItem}
            placeholder='Search a chat' 
            onChange={(e) => setSearchItem(e.target.value)}
            adornment={<IoSearchSharp />}
            />
        </div>
        <ChatDetails />
      </div>
    </div>
  )
}

