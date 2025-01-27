import MainLayout from '../../layout/MainLayout';
import React from 'react'
import { useGetUserById } from '../../hooks/userQuery';
import { useAuth } from '../../context/AuthContext';
import LoadingScreen from '../../components/molecules/LoadingScreen';
import ProfileContainer from '../../components//organisms/ProfileContainer';
import { ProfileType } from 'types/Profile.type';

export default function Index() {
  const { user } = useAuth();
  const { data: fetchedUser, isLoading } = useGetUserById(user?.uid as string);
  
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

