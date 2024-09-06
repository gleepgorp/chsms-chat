import React from 'react'
import MeatballMenu from './MeatballMenu'
import ChatProfilePicture from './ChatProfilePicture'
import { useChatContext } from '../../context/ChatContext';
import { useNewChatContext } from '../../context/NewChatContext';
import { useRouter } from 'next/router';
import GroupUserProfilePics from './GroupUserProfilesPics';

export default function ChatMessageHeader(): JSX.Element {
  const { firstnameInitial, lastnameInitial, profile, firstname, lastname, groupParticipants, isGroup } = useChatContext();
  const { 
    firstnameInitial: NewChatFirstnameInitial, 
    lastnameInitial: NewChatLastnameInitial, 
    firstname: NewChatFirstname, 
    lastname: NewChatLastname, 
    profile: NewChatProfile } = useNewChatContext();
  const router = useRouter();
  const newChatRoute = router.pathname.includes('/new');
  const group = groupParticipants.map((user, index) => {
    const firstUser = index === 0;
    return (
      <span key={index}>
        {`${firstUser ? '' : ','} ${user.firstname}`}
      </span>
    )
  })
  const moreThanFive = group.length > 5;

  return (
    <div className='p-2 flex flex-row justify-between'>
      <div className='flex flex-row items-center'>
        {isGroup ? 
          <div className='relative w-12 h-9'>
            <GroupUserProfilePics 
              size='xs'
              group={isGroup}
              noChatName={true}
              participants={groupParticipants}
            />
          </div>
          :
          <ChatProfilePicture 
            profile={newChatRoute ? NewChatProfile : profile}
            firstnameInitial={newChatRoute ? NewChatFirstnameInitial : firstnameInitial}
            lastnameInitial={newChatRoute ? NewChatLastnameInitial : lastnameInitial}
            variant='sm'
          />
        }
        <span className={`${!isGroup && 'pl-2'} capitalize text-stone-100 font-medium text-sm flex flex-row`}>
          {isGroup ? (moreThanFive ? group.slice(0, 2) : group) : 
            `${newChatRoute ? NewChatFirstname : firstname} 
            ${newChatRoute ? NewChatLastname : lastname}`
          } 
        </span>
        {moreThanFive && 
          <span className='text-stone-100 font-medium text-sm pl-1'>and others</span>
        }
      </div>
      <div>
        <MeatballMenu participants={[]} isHidden={false}/>
      </div>
    </div>
  )
}

