import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ProfileType } from 'types/Profile.type'
import SearchProfileLayout from '../molecules/SearchProfileLayout';
import { useModalContext } from '../../context/ModalContext';
import { useAuth } from '../../context';
import { UserGroupType } from 'types/Chat.type';

type ChatSearchContainerProps = {
  data: ProfileType[];
  type?: string;
  forModal?: boolean;
  handleSearchItem?: () => void;
}

export default function ChatSearchContainer(props: ChatSearchContainerProps) {
  const { user, profile } = useAuth();
  const userId = user && user.uid;
  const loggedUserFullname = `${profile?.firstname} ${profile?.lastname}`
  const loggedUser: UserGroupType = { user: loggedUserFullname, id: userId as string};
  const { data, handleSearchItem, forModal } = props;
  const { setGroupMembers, groupMembers } = useModalContext();

  useEffect(() => {
    console.log(groupMembers);
  }, [groupMembers])

  // collects data to set group members ui
  const handleProfileSelect = (user: string, id: string) => {
    setGroupMembers(prev => {
      const member = { user, id };
      
      if (!prev.some(m => m.id === id)) {
        return [...prev, member];
      }
      return prev;
    });
  };

  // exclude logged user since its already the creator
  const excludeLoggedUser = data.filter(doc => doc.accountId !== loggedUser.id);
  const mappedData = excludeLoggedUser.map((doc, index) => {
    return (
      <div key={doc.accountId || index}>
        <SearchProfileLayout 
          forModal={forModal}
          handleSearchItem={handleSearchItem}
          accountId={doc.accountId}
          profileUrl={doc.profilePicture}
          firstname={doc.firstname}
          lastname={doc.lastname}
          bgColor={doc.profileBgColor}
          onSelect={handleProfileSelect}
        />
      </div>
    )
  })
  return (
    <div className='text-stone-100 h-full w-full rounded-lg'>
      {mappedData}
    </div>
  )
}

