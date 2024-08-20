import React from 'react'
import MeatballMenu from './MeatballMenu'
import ChatProfilePicture from './ChatProfilePicture'
import { useChatContext } from '../../context/ChatContext';
import { useGetUserById } from '../../hooks';
import { useNewChatContext } from '../../context/NewChatContext';
import { useRouter } from 'next/router';

export default function ChatMessageHeader(): JSX.Element {
  const { firstnameInitial, lastnameInitial, profile, firstname, lastname } = useChatContext();
  const { 
    firstnameInitial: NewChatFirstnameInitial, 
    lastnameInitial: NewChatLastnameInitial, 
    firstname: NewChatFirstname, 
    lastname: NewChatLastname, 
    profile: NewChatProfile } = useNewChatContext();
  const router = useRouter();
  const newChatRoute = router.pathname.includes('/new');
  const { data: fetchedUser, isLoading } = useGetUserById('');

  return (
    <div className='p-2 flex flex-row justify-between'>
      <div className='flex flex-row items-center gap-2'>
        <ChatProfilePicture 
          profile={newChatRoute ? NewChatProfile : profile}
          firstnameInitial={newChatRoute ? NewChatFirstnameInitial : firstnameInitial}
          lastnameInitial={newChatRoute ? NewChatLastnameInitial : lastnameInitial}
          variant='sm'
        />
        <span className='capitalize text-stone-100 font-medium text-sm'>
          {`${newChatRoute ? NewChatFirstname : firstname} 
            ${newChatRoute ? NewChatLastname : lastname}`}
        </span>
      </div>
      <div>
        <MeatballMenu participants={[]} isHidden={false}/>
      </div>
    </div>
  )
}

