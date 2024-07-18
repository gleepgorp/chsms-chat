import MainLayout from '../../layout/MainLayout'
import { useRouter } from 'next/router';
import React from 'react'
import { useGetUserById } from '../../hooks/userQuery';
import LoadingScreen from '../../components/molecules/LoadingScreen';
import ProfileContainer from '../../components//organisms/ProfileContainer';
import { ProfileType } from 'types/Profile.type';

export default function Profile() {
  const router = useRouter();
  const { query } = router;
  const { data: fetchedUser, isLoading } = useGetUserById(query?.id as string);

  return (  
    <MainLayout>
      {isLoading ? (
        <div className='max-w-screen-xl mx-auto'>
          <LoadingScreen />
        </div>    
      ) : 
    <ProfileContainer fetchedProfileData={fetchedUser as ProfileType}/>}
    </MainLayout>
  ) 
}

