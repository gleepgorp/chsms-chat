import React, { useRef } from 'react'
import { GoKebabHorizontal } from "react-icons/go";
import { ProfileType } from 'types/Profile.type';
import { FaTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import ChatDropdownMenu from './ChatDropdownMenu';
import Button from './Button';

type MeatballMenuType = {
  isHidden: boolean;
  isOpen?: boolean;
  participants: ProfileType[];
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function MeatballMenu(props: MeatballMenuType) {
  const { isHidden, onClick, isOpen, participants } = props;
  const inputRef = useRef();

  function handleDelete(e: UIEvent) {
    e.stopPropagation();
    e.preventDefault();
    console.log("hellow");
  }

  return (
    <div 
      onClick={onClick}
      className={`bg-stone-600/60 hover:bg-stone-500/80 p-1.5 rounded-full cursor-pointer ${isOpen ? '' : isHidden && 'hidden'} group-hover:block`}
    >
      <GoKebabHorizontal className='text-lg text-stone-400'/>
      <ChatDropdownMenu
        participants={participants || []}
        isOpen={isOpen}
      >
        <Button 
          width='full'
          variant='noBg' 
          inputAdornment={<FaCheck />} 
        >
          Mark as unread
        </Button>
        {participants.length > 2 &&
          <Button 
            width='full'
            variant='noBg' 
            inputAdornment={<LuLogOut />} 
          >
            Leave group
          </Button>
        }
        <Button 
          width='full'
          variant='noBg' 
          onClick={(e: UIEvent) => handleDelete(e)}
          inputAdornment={<FaTrashAlt />} 
        >
          Delete chat
        </Button>
      </ChatDropdownMenu>
    </div>
  )
}

