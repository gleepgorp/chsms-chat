import React, { Dispatch, SetStateAction } from 'react'
import { ProfileType } from 'types/Profile.type'
import SearchProfileLayout from '../molecules/SearchProfileLayout';

type ChatSearchContainerProps = {
  data: ProfileType[];
  handleSearchItem?: () => void;
}

export default function ChatSearchContainer(props: ChatSearchContainerProps) {
  const { data, handleSearchItem } = props;

  const mappedData = data.map((doc, index) => {
    return (
      <div key={index}>
        <SearchProfileLayout 
          handleSearchItem={handleSearchItem}
          accountId={doc.accountId}
          profileUrl={doc.profilePicture}
          firstname={doc.firstname}
          lastname={doc.lastname}
          bgColor={doc.profileBgColor}
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

