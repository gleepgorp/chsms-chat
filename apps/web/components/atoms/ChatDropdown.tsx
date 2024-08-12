import React from 'react'

type ChatDropdownProps = {
  isOpen?: boolean;
}
export default function ChatDropdown(props: ChatDropdownProps) {
  const { isOpen } = props;
  return (
    <>
      {isOpen && 
        <div className='text-stone-100 absolute bg-lime-400'>
          startNOW
        </div>
      }
    </>
  )
}
