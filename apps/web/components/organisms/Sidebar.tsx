import React from 'react'
import LogoutButton from '../atoms/LogoutButton'
import { IoChatbubbleEllipsesOutline , IoChatbubbleEllipses   } from "react-icons/io5";
import { PiUser, PiUserBold  } from "react-icons/pi";
import { Routes } from '../../constants/routes';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Tooltip from '../atoms/Tooltip';

export default function Sidebar() {
  const router = useRouter();
  
  function isActive(route: string) {
    const cleanRoute = route.startsWith('/') ? route.slice(1) : route;
    if (cleanRoute === '') {
      return router.pathname === '/' || router.pathname.includes('/chat');
    }
    return router.pathname === `/${cleanRoute}` || router.pathname.startsWith(`/${cleanRoute}/`);
  };
  const mainMenu = [
    {
      route: `${Routes.HOME}`,
      title: 'Chat',
      icon: <IoChatbubbleEllipsesOutline />,
      activeIcon: <IoChatbubbleEllipses />
    },
    {
      route: `${Routes.PROFILE}`,
      title: 'Profile',
      icon: <PiUser />,
      activeIcon: <PiUserBold />,
    },
  ];

  const mappedMenu = mainMenu.map((menu, index) => (
    <div 
      key={index} 
      className={`
          bg-none
          ${isActive(menu.route) && 'bg-stone-700'}
          ${!isActive(menu.route) && 'hover:bg-stone-700/40'}
          text-stone-100 active:scale-95
          cursor-pointer
          text-base rounded-lg
          ${isActive(menu.route) && 'font-semibold'}
        `}
    >
      <Tooltip content={menu.title} placement='right'>
        <Link href={menu.route} className='p-3 flex flex-row items-center'>
          <span className='text-xl'>{isActive(menu.route) ? menu.activeIcon : menu.icon}</span>
        </Link>  
      </Tooltip>
    </div>
  ))

  return (
    <div className='py-6 px-2 bg-stone-900/50'>
      <div className='flex flex-col h-full'>
        <div className='flex-1'>{mappedMenu}</div>
        <LogoutButton />
      </div>
    </div>
  )
}

