import React from 'react'
import Button from './Button';
import { FaCheck } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { ProfileType } from 'types/Profile.type';

type ChatDropdownProps = {
  isOpen?: boolean;
  participants: ProfileType[];
}
export default function ChatDropdown(props: ChatDropdownProps) {
  const { isOpen, participants } = props;
  const dropdownMenu = [
    {
      title: 'Mark as unread',
      icon: <FaCheck />
    },
    ...(participants?.length > 2 ? [
      {
        title: 'Leave Group',
        icon: <LuLogOut />
      },
    ] : []),
    {
      title: 'Delete chat',
      icon: <FaTrashAlt />
    },
  ];

  const mappedMenu = dropdownMenu.map((menu, index) => {

    return (
      <React.Fragment key={index}>
        <Button
          variant='noBg'
        >
          <div className='flex flex-row gap-4 items-center'>
            <span className='text-base bg-stone-500/40 p-1.5 rounded-full'>{menu.icon}</span>
            <span className=''>{menu.title}</span>
          </div>
        </Button>
      </React.Fragment>
    )
  })
  
  return (
    <>
      {isOpen && 
        <div
          className='
            text-stone-100
            bg-[#3D3B38]
             absolute 
             rounded-lg
             -translate-x-1/2
             mt-6 
             z-50
             shadow
            '
         >
          <div className='flex flex-col p-1 w-60'>
            {mappedMenu}
          </div>
        </div>
      }
    </>
  )
}
