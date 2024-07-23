import React, { useEffect } from 'react'
import MeatballMenu from '../atoms/MeatballMenu'
import { ChatType } from 'types/Chat.type';
import { useAuth } from '../../context/index';
import { convertTimestamp } from '../../utils/index';

type ChatDetailsProps = {
  fetchedChats: ChatType[];
  isChatLoading: boolean;
}

export default function ChatDetails(props: ChatDetailsProps) {
  const { fetchedChats, isChatLoading } = props;
  const { user } = useAuth();

  if (!fetchedChats || fetchedChats.length === 0) {
    return <div>No chats available.</div>;
  }
  
  return (
    <div>
      {fetchedChats.map((data, index) => (
        <div key={index} className='hover:bg-stone-500/20 rounded-xl py-4 px-3 cursor-pointer text-stone-100 flex flex-row items-center justify-between'>
          <div className='flex flex-row items-center gap-2'>
            <div className='flex items-center justify-center w-12 h-12 rounded-full'>
              <span className=''>VT</span>
            </div>
            <div className='flex flex-col'>
              <span className='font-medium text-md '>{data.participants?.map(p => p.firstname) || 'No data'}</span>
              <div className='flex flex-row gap-2 text-sm text-stone-400'>
                <span>{data.lastMessage.content}</span>
                <span className='font-bold'>·</span>
                <span>{convertTimestamp(data.lastMessage.timestamp).toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div>
            <MeatballMenu />
          </div>
        </div>
      ))}
    </div>
  );
}

