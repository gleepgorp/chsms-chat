/* eslint-disable @nx/enforce-module-boundaries */
import React, { useEffect, useState } from 'react'
import { useAuth } from 'apps/web/context/AuthContext'
import { useRouter } from 'next/router';
import { Routes } from 'apps/web/constants/routes';
import LoadingScreen from '../molecules/LoadingScreen';
import { useGetChatsByUserId } from 'apps/web/hooks';

type PropsType = {
  children: React.ReactNode | React.ReactNode[];
};

export default function Authenticated({ children }: PropsType): React.ReactElement | null {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { query } = router;
  const { id } = router.query;
  const userId = Array.isArray(user?.uid) ? user?.uid[0] : user?.uid || '';
  const { data: fetchedChats } = useGetChatsByUserId(userId);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const isPartOfChat = fetchedChats?.some(chat => chat.id === id);

  useEffect(() => {
    if (!loading) {
      if (user && (router.pathname === Routes.LOGIN || router.pathname === Routes.SIGN_UP)) {
        router.push(Routes.HOME);
      } else if (!user && (router.pathname === Routes.HOME || router.pathname.includes(Routes.CHAT))) {
        router.push(Routes.LOGIN);
      } else if (user && user?.uid === query.id) {
        router.push(Routes.PROFILE);
      } 
      // else if (user && fetchedChats && router.pathname.startsWith(Routes.CHAT)) {
      //   if (!isPartOfChat) {
      //     router.push(Routes.HOME);
      //   }
      // }
       else {
        setIsAuthorized(true);
      }
    }
  }, [user, router, loading, query, id, fetchedChats, isPartOfChat]);

  if (isAuthorized === null || loading) {
    return (
      <div className='flex max-w-screen-xl mx-auto'>
        <LoadingScreen />
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
} 