import React from 'react'
import { GoKebabHorizontal } from "react-icons/go";

type MeatballMenuType = {
  isHidden: boolean
}

export default function MeatballMenu(props: MeatballMenuType) {
  const { isHidden } = props;
  return (
    <div className={`bg-stone-600/60 hover:bg-stone-500/80 p-1.5 rounded-full cursor-pointer ${isHidden && 'hidden'} group-hover:block`}>
      <GoKebabHorizontal className='text-lg text-stone-400'/>
    </div>
  )
}

