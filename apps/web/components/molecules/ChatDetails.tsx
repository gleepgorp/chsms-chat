import React from 'react'
import MeatballMenu from '../atoms/MeatballMenu'

export default function ChatDetails() {
  return (
    <div className='hover:bg-stone-500/20 rounded-xl py-4 px-3 cursor-pointer text-stone-100 flex flex-row items-center justify-between'>
      <div className='flex flex-row items-center gap-2'>
        <div className='flex items-center justify-center w-12 h-12 bg-slate-500 rounded-full'>
          <span className=''>VT</span>
        </div>
        <div className='flex flex-col'>
          <span className='font-medium text-md '>Vince Tapdasan</span>
          <div className='flex flex-row gap-2 text-sm text-stone-400'>
            <span>Message here hello world!</span>
            <span className='font-bold'>·</span>
            <span>1h</span>
          </div>
        </div>
      </div>
      <div>
        <MeatballMenu />
      </div>
    </div>
  )
}

