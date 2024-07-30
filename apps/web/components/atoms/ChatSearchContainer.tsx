import React, { useEffect } from 'react'
import { ProfileType } from 'types/Profile.type'
import SearchProfileLayout from '../molecules/SearchProfileLayout';

type ChatSearchContainerProps = {
  data: ProfileType[];
}

export default function ChatSearchContainer(props: ChatSearchContainerProps) {
  const { data } = props;
  return (
    <div className='text-stone-100 h-full w-full rounded-lg'>
      <SearchProfileLayout />
    </div>
  )
}

