import React, { ReactNode, useState } from 'react'
import ChatDetails from '../molecules/ChatDetails'
import TextInput from '../atoms/TextInput'
import { IoSearchSharp } from "react-icons/io5";
import NewChat from '../molecules/NewChat';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useSearchUser } from 'apps/web/hooks';
// eslint-disable-next-line @nx/enforce-module-boundaries
import useDebounce from 'apps/web/hooks/useDebounce';
import { ChatType } from 'types/Chat.type';
import ChatSearchContainer from '../atoms/ChatSearchContainer';

type ChatContainerType = {
  children?: React.ReactNode;
  fetchedChats: ChatType[];
  isChatLoading: boolean;
}

export default function ChatContainer(props: ChatContainerType): JSX.Element {
  const { children, fetchedChats, isChatLoading } = props;
  const debouncedDelay = 200; 
  const [searchItem, setSearchItem] = useState<string>("");
  const searchItemDebounced = useDebounce(searchItem, debouncedDelay);
  const { data, isLoading, error } = useSearchUser(searchItemDebounced);

  function handleSearchItem() {
    setSearchItem('');
  }

  return (
    <>
    <div className='min-w-[480px] h-full flex-1 pt-4 pl-4 pb-4'>
      <div className='bg-stone-700/20 h-full rounded-lg p-3 flex flex-col'>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-row items-center justify-between'>
            <span className='text-stone-100 font-bold text-xl'>Chats</span>
            <NewChat />
          </div>
          <div className='pb-3'>
            <TextInput 
              type='text'
              value={searchItem}
              searchItem={searchItem}
              handleSearchItem={handleSearchItem}
              placeholder='Search a chat' 
              onChange={(e) => setSearchItem(e.target.value)}
              adornment={<IoSearchSharp />}
              />
          </div>
        </div>
        <div className='overflow-y-auto h-full'>
          {searchItem ? 
            <ChatSearchContainer 
              data={data || []}
            /> :
            <ChatDetails 
              isChatLoading={isChatLoading}
              fetchedChats={fetchedChats}
              />
          } 
        </div>
      </div>
    </div>
    <div className='w-full pt-4 pr-4 pb-4'>{children}</div>
    </>
  )
}

