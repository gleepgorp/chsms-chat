import React from 'react'
import { BiSolidEdit } from "react-icons/bi";
import Button from '../atoms/Button';
import Tooltip from '../atoms/Tooltip';

export default function NewChat() {
  return (
    <div className='relative flex items-center justify-center'>
      <Tooltip content='New chat'>
        <Button variant='icon' roundedSize='full' size='icon'>
          <BiSolidEdit className='text-xl'/>
        </Button>  
      </Tooltip>
    </div>
  )
}

