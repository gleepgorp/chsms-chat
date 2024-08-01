import React from 'react'
import MeatballMenu from './MeatballMenu'
import ChatProfilePicture from './ChatProfilePicture'
import { useChatContext } from '../../context/ChatContext';
import { useGetUserById } from '../../hooks';

export default function ChatMessageHeader(): JSX.Element {
  const { firstnameInitial, lastnameInitial, profile, firstname, lastname } = useChatContext();
  const { data: fetchedUser, isLoading } = useGetUserById('');

  return (
    <div className='p-2 flex flex-row justify-between'>
      <div className='flex flex-row items-center gap-2'>
        <ChatProfilePicture 
          profile={profile}
          firstnameInitial={firstnameInitial}
          lastnameInitial={lastnameInitial}
          variant='sm'
        />
        <span className='capitalize text-stone-100 font-medium text-sm'>{`${firstname} ${lastname}`}</span>
      </div>
      <div>
        <MeatballMenu isHidden={false}/>
      </div>
    </div>
  )
}

