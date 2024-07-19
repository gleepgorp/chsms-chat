import React from 'react'
import { GoKebabHorizontal } from "react-icons/go";

export default function MeatballMenu() {
  return (
    <div className='bg-stone-600 hover:bg-stone-500/80 p-1.5 rounded-full'>
      <GoKebabHorizontal className='text-lg text-stone-400'/>
    </div>
  )
}

