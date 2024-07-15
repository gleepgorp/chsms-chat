import React, { useEffect, useState } from 'react'
import { useAuth } from 'apps/web/context/AuthContext'
import { useRouter } from 'next/router';
import { Routes } from 'apps/web/constants/routes';
import LoadingScreen from '../molecules/LoadingScreen';

type PropsType = {
  children: React.ReactNode | React.ReactNode[];
};

export default function Authenticated({ children }: PropsType): React.ReactElement | null {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!loading) {
      if (user && (router.pathname === Routes.LOGIN || router.pathname === Routes.SIGN_UP)) {
        router.push(Routes.HOME);
      } else if (!user && router.pathname === Routes.HOME) {
        router.push(Routes.LOGIN);
      } else {
        setIsAuthorized(true);
      }
    }
  }, [user, router, loading]);

  if (isAuthorized === null || loading) {
    return (
      <div className='flex max-w-screen-xl mx-auto'>
        <LoadingScreen />
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
} 