import React from 'react'
import { ProfileType } from 'types/Profile.type';
import ChatProfilePicture from '../atoms/ChatProfilePicture';

type SearchProfileLayoutrProps = {
  chatId: string;
  profileUrl?: string;
  firstname?: string;
  lastname?: string;
  bgColor?: string;
}

export default function SearchProfileLayout() {
  return (
    <div className='flex flex-row items-center gap-3 py-2 hover:bg-stone-500/20 rounded-lg cursor-pointer px-3'>
      <ChatProfilePicture 
        profile={'#ffffff'}
        firstnameInitial={'A'}
        lastnameInitial={'B'}
        variant='sm'
      />
      <span>Vince Tapdasan</span>
    </div>
  ) 
}

