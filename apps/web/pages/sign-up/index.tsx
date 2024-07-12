import React from 'react'
import Image from 'next/image'
import AuthContainer from 'apps/web/components/organisms/AuthContainer'
import { registerWithEmailAndPassword } from 'apps/web/utils/firebase.utils'

export default function CreateAccount(): JSX.Element {
  async function handleSignUp(email: string, password: string, firstname: string, lastname: string): Promise<void> {
    await registerWithEmailAndPassword(email, password, firstname, lastname);
  };

  return (
    <div className='mx-10 my-24 lg:mx-60 lg:my-40 sm:mx-32 sm:my-20'>
      <div className='relative'>
        <Image 
          className='pointer-events-none absolute -top-10'
          height={56}
          width={56}
          alt='Chsms logo'
          src="/images/chsms-icon.png"
        />
        <div className='flex flex-col mb-20'>
          <span className="text-chsms-orange font-bold sm:text-8xl text-7xl">
            chsms!
          </span>
          <span className="text-stone-100 font-light text-md lg:text-lg mt-2 w-64 lg:w-96">
            Create an account, invite your friends, and start chatting! 🤜🤛
          </span>
        </div>
      </div>
      <AuthContainer handleFormSubmit={handleSignUp}/>
    </div>
  )
}

