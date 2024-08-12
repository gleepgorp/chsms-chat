import React from 'react'
import { GoKebabHorizontal } from "react-icons/go";
import ChatDropdown from './ChatDropdown';

type MeatballMenuType = {
  isHidden: boolean;
  isOpen?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function MeatballMenu(props: MeatballMenuType) {
  const { isHidden, onClick, isOpen } = props;
  return (
    <div 
      onClick={onClick}
      className={`bg-stone-600/60 hover:bg-stone-500/80 p-1.5 rounded-full cursor-pointer ${isOpen ? '' : isHidden && 'hidden'} group-hover:block relative`}
    >
      <GoKebabHorizontal className='text-lg text-stone-400'/>
      <ChatDropdown isOpen={isOpen}/>
    </div>
  )
}

