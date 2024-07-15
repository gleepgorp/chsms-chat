import React from 'react';
import Button from './Button';
import { logout } from 'apps/web/utils/firebase.utils';
import { IoLogOutOutline } from "react-icons/io5";
import { useRouter } from 'next/router';
import { Routes } from 'apps/web/constants/routes';

export default function LogoutButton() {
  const router = useRouter();
  function handleLogout() {
    logout();
    router.push(`${Routes.LOGIN}`);
  };  
  
  return (
    <Button 
      variant='secondary'
      width='full' 
      adornment={true} 
      onClick={handleLogout}
    >
      <IoLogOutOutline className='text-lg'/>
      Logout
    </Button>
  )
}

