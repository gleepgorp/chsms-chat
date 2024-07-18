import React from 'react';
import Button from './Button';
import { logout } from '../../utils/firebase.utils';
import { IoLogOutOutline } from "react-icons/io5";
import { useRouter } from 'next/router';
import { Routes } from '../../constants/routes';

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

