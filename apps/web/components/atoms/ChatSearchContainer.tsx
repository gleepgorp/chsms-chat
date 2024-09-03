import React, { Dispatch, SetStateAction, useState } from 'react'
import { ProfileType } from 'types/Profile.type'
import SearchProfileLayout from '../molecules/SearchProfileLayout';
import { useModalContext } from '../../context/ModalContext';

type ChatSearchContainerProps = {
  data: ProfileType[];
  type?: string;
  forModal?: boolean;
  handleSearchItem?: () => void;
}

export default function ChatSearchContainer(props: ChatSearchContainerProps) {
  const { data, handleSearchItem, forModal } = props;
  const { setGroupMembers, setGroupMembersIds } = useModalContext();

  // collects data to set group members 
  const handleProfileSelect = (user: string, id: string) => {
    setGroupMembers(prev => {
      // condition to exclude existing data
      if (prev.includes(user)) {
        return prev;
      } else {
        const newMembers = [...prev, user];
        return newMembers;
      }
    });
    setGroupMembersIds(prev => {
      if (prev.includes(id)) {
        return prev;
      } else {
        const newIds = [...prev, id];
        return newIds;
      }
    })
  };

  const mappedData = data.map((doc, index) => {
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

