import { useNewChatContext } from '../../context/NewChatContext';
import { useRouter } from 'next/router';
import React from 'react'

export default function NewChatProfileLayout() {
  const router = useRouter();
  const newChatRoute = router.pathname.includes('/new');
  const isNewChat = newChatRoute ? 'bg-stone-500/40 hover:bg-stone-500/40' : '';
  const { firstname, lastname } = useNewChatContext();
  const fullname = `${firstname} ${lastname}`;
  
  return (
    <div className={`
      ${isNewChat}
      px-6 py-6 cursor-pointer text-stone-100 flex flex-row items-center group rounded-lg text-sm
    `}>
      {`New chat to `} <span className='capitalize pl-1 font-medium'>{fullname}</span>
    </div>
  )
}

