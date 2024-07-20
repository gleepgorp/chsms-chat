import React from 'react'
import { ProfileType } from 'types/Profile.type';
import ProfilePhoto from '../atoms/ProfilePhoto';
import LoadingScreen from '../molecules/LoadingScreen';
import Tooltip from '../atoms/Tooltip';

type ProfileContainerProps = {
  fetchedProfileData: ProfileType;
};

export default function ProfileContainer(props: ProfileContainerProps): JSX.Element {
  const { fetchedProfileData } = props;

  if (!fetchedProfileData) {
    return (
      <div className='max-w-screen-xl mx-auto'>
        <LoadingScreen />
      </div>
    )
  }
  
  return (
    <div className='flex h-full items-center justify-center'>
      <div className='flex flex-row gap-8'>
        <Tooltip content='Upload photo'>
          <ProfilePhoto 
            profileUrl={fetchedProfileData.profilePicture}
            firstname={fetchedProfileData.firstname}
            lastname={fetchedProfileData.lastname}
            bgColor={fetchedProfileData.profileBgColor}
          />
        </Tooltip>
        <div className='text-stone-100 flex flex-col gap-6'>
          <div className='flex flex-col'>
            <span className='capitalize text-2xl font-semibold'>{fetchedProfileData.firstname} {fetchedProfileData.lastname}</span>
            <span className='text-lg font-light'>{fetchedProfileData.email}</span>
          </div>
          <div className='line-clamp-3 w-96'>
            <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum, velit reiciendis soluta provident ad earum nesciunt hic natus veniam omnis ullam facere vero nobis magnam odit! Optio blanditiis officia voluptate.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

