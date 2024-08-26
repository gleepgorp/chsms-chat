import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { GoKebabHorizontal } from "react-icons/go";
import { ProfileType } from 'types/Profile.type';
import { FaTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import ChatDropdownMenu from './ChatDropdownMenu';
import Button from './Button';
import { useDeleteChat } from '../../hooks/useMutation';
import { useModalContext } from 'apps/web/context/ModalContext';
// const { mutate: deleteChat } = useDeleteChat({
//   onSuccess: deleteChat => {

//   }
// })

type MeatballMenuType = {
  isHidden: boolean;
  isOpen?: boolean;
  chatId: string;
  participants: ProfileType[];
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MeatballMenu(props: MeatballMenuType) {
  const { isHidden, onClick, isOpen, participants, chatId, setIsOpen } = props;
  const { setIsOpen: setOpenModal, setChatId } = useModalContext()
  const menuRef = useRef<HTMLDivElement>(null);

  function handleDelete(e: UIEvent) {
    e.stopPropagation();
    e.preventDefault();
    setChatId(chatId);
    setOpenModal(true);
    setIsOpen(!isOpen);
  }

  return (
    <div 
      ref={menuRef}
      onClick={onClick}
      className={`bg-stone-600/60 hover:bg-stone-500/80 p-1.5 rounded-full cursor-pointer ${isOpen ? '' : isHidden && 'hidden'} group-hover:block`}
    >
      <GoKebabHorizontal className='text-lg text-stone-400'/>
      <ChatDropdownMenu
        isOpen={isOpen}
        menuRef={menuRef}
        setIsOpen={setIsOpen}
        participants={participants || []}
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

