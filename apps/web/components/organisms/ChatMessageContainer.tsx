import React from 'react'
import ChatMessageHeader from '../atoms/ChatMessageHeader';

type ChatMessageContainerProps = {
  chatId: string | null;
  firstnameInitiial: string;
  lastnameInitial: string;
  profile: string;
  firstname: string;
  lastname: string;
}

export default function ChatMessageContainer(props: ChatMessageContainerProps) {
  const { chatId, firstnameInitiial, lastnameInitial, profile, firstname, lastname } = props;

  return (
    <div className='w-full h-full rounded-lg'>
      <div className='p-2 bg-stone-700/20 h-full'>
        <div className='flex flex-col h-full'>
          <ChatMessageHeader 
            firstname={firstname}
            lastname={lastname}
            profile={profile}
            lastnameInitial={lastnameInitial}
            firstnameInitiial={firstnameInitiial}
          />
          <div className='bg-red-200 flex-1'>
            asd
          </div>
          <div className='bg-lime-100'>
            Chat footer
          </div>
        </div>
      </div>
    </div>
  )
}

