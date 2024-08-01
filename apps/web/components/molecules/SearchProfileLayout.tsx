import React, { Dispatch, SetStateAction } from 'react'
import ChatProfilePicture from '../atoms/ChatProfilePicture';
import Link from 'next/link';
import { extractInitials } from '../../utils';
import { useGetChatByParticipants } from '../../hooks';
import { useAuth } from '../../context';

type SearchProfileLayoutrProps = {
  accountId: string;
  profileUrl?: string;
  firstname?: string;
  lastname?: string;
  bgColor?: string;
  handleSearchItem?: () => void;
}

export default function SearchProfileLayout(props: SearchProfileLayoutrProps) {
  const { user } = useAuth();
  const { accountId, profileUrl, firstname, lastname, bgColor, handleSearchItem } = props;
  const { data: fetchedChats, isLoading } = useGetChatByParticipants
  (user?.uid || '', accountId);
  const profile = !profileUrl ? bgColor : profileUrl;
  const chatExist = !fetchedChats?.id ? '/new' : `/chat/${fetchedChats.id}`;

  return (
    <Link href={chatExist} onClick={handleSearchItem} className='flex flex-row items-center gap-3 py-2 hover:bg-stone-500/20 rounded-lg cursor-pointer px-3'>
      <ChatProfilePicture 
        profile={profile}
        firstnameInitial={extractInitials(firstname)}
        lastnameInitial={extractInitials(lastname)}
        variant='sm'
      />
      <span className='text-sm font-medium capitalize'>{`${firstname} ${lastname}`}</span>
    </Link>
  ) 
}

