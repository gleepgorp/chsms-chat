import React from 'react'
import Image from 'next/image'
import SignUpInput from 'apps/web/components/molecules/SignUpForm'

export default function CreateAccount() {
  return (
    <div className='mx-60 my-40'>
      <div className='relative'>
        <Image 
          className='pointer-events-none absolute -top-10'
          height={56}
          width={56}
          alt='Chsms logo'
          src="/images/chsms-icon.png"
        />
        <div className='flex flex-col mb-20'>
          <span className="text-chsms-orange font-bold text-8xl">
            chsms!
          </span>
          <span className="text-stone-100 font-light text-lg mt-2 w-96">
            Create an account, invite your friends, and start chatting! 🤜🤛
          </span>
        </div>
      </div>
      <SignUpInput />
    </div>
  )
}

