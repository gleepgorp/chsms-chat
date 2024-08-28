import React from 'react'
import { IoMdPeople } from "react-icons/io";
import Button from '../atoms/Button';
import Tooltip from '../atoms/Tooltip';
import { useModalContext } from '../../context/ModalContext';

export default function NewChat() {
  const { setIsOpen, setModalType } = useModalContext();

  function handleOpenModal() {
    console.log("Hello world");
    setIsOpen(true);
    setModalType('form');
  }

  return (
    <div className='relative flex items-center justify-center'>
      <Tooltip size='xs' content='Create group chat'>
        <Button 
          size='icon'
          variant='icon' 
          roundedSize='full' 
          onClick={handleOpenModal}
        >
          <IoMdPeople className='text-xl'/>
        </Button>  
      </Tooltip>
    </div>
  )
}

