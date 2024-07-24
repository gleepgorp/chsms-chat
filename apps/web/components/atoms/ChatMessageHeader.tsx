import React from 'react'
import MeatballMenu from './MeatballMenu'
import ChatProfilePicture from './ChatProfilePicture'

type ChatMessageHeaderProps = {
  firstnameInitiial: string;
  lastnameInitial: string;
  profile: string;
  firstname: string;
  lastname: string;
}

export default function ChatMessageHeader(props: ChatMessageHeaderProps) 
{
  const { firstnameInitiial, lastnameInitial, profile, firstname, lastname } = props;

  return (
    <div className='p-2 flex flex-row justify-between'>
      <div className='flex flex-row items-center gap-2'>
        <ChatProfilePicture 
          profile={profile}
          firstnameInitial={firstnameInitiial}
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

