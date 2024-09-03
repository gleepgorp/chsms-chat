import React, { useEffect, useState } from 'react'
import ChatProfilePicture from '../atoms/ChatProfilePicture';
import { extractInitials } from '../../utils';
import { useGetChatByParticipants } from '../../hooks';
import { useAuth } from '../../context';
import { useNewChatContext } from '../../context/NewChatContext';
import { useRouter } from 'next/router';
import { useModalContext } from '../../context/ModalContext';

type SearchProfileLayoutrProps = {
  accountId: string;
  profileUrl?: string;
  firstname?: string;
  lastname?: string;
  bgColor?: string;
  forModal?: boolean
  onSelect: (firstname: string, id: string) => void;
  handleSearchItem?: () => void;
}

export default function SearchProfileLayout(props: SearchProfileLayoutrProps) {
  const { user } = useAuth();
  const router = useRouter();
  const { groupMembers } = useModalContext();
  const { accountId, profileUrl, firstname, lastname, bgColor, handleSearchItem, forModal, onSelect } = props;
  const { data: fetchedChats, isLoading } = useGetChatByParticipants(user?.uid || '', accountId);

  const profile = !profileUrl ? bgColor : profileUrl;
  const chatExist = fetchedChats && fetchedChats?.id ? `/chat/${fetchedChats?.id}` : '/new';
  const fullName = `${firstname} ${lastname}`

  const { 
    setFirstnameInitial, 
    setLastnameInitial, 
    setFirstname, 
    setLastname, 
    setRecipientId, 
    setProfile } = useNewChatContext();

  function handleProfileClick() {
    if (forModal) {
      onSelect((fullName || ''), accountId);
    } else {
      if (handleSearchItem) {
        handleSearchItem();
      }
      setFirstnameInitial(extractInitials(firstname) || '');
      setLastnameInitial(extractInitials(lastname) || '');
      setFirstname(firstname || '');
      setLastname(lastname || '');
      setProfile(profile || '');
      setRecipientId(accountId || '');
      router.push(chatExist);
    }
  }

  return (
    <div onClick={handleProfileClick} className='flex flex-row items-center gap-3 py-2 hover:bg-stone-500/20 rounded-lg cursor-pointer px-3'>
      <ChatProfilePicture 
        profile={profile}
        firstnameInitial={extractInitials(firstname)}
        lastnameInitial={extractInitials(lastname)}
        variant='sm' 
      />
      <span className='text-sm font-medium capitalize'>{`${firstname} ${lastname}`}</span>
    </div>
  ) 
}

