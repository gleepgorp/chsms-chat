
import Image from 'next/image';
import AuthContainer from '../components/organisms/AuthContainer';
import { signInWithEmailPassword } from '../utils/firebase.utils';

export default function Login () {
  async function handleSignIn(email: string, password: string): Promise<void> {
    await signInWithEmailPassword(email, password);
  };

  return (
    <div className='relative mx-10 my-10 lg:mx-60 lg:my-40 sm:mx-32 sm:my-20'>
      <Image 
        className='pointer-events-none mb-8'
        height={56}
        width={56}
        alt='Chsms logo'
        src="/images/chsms-icon.png"
      />
      <div className='flex flex-row gap-10'>
        <div className='flex flex-col gap-10'>
          <div className='flex flex-col'>
            <div className='flex flex-col'>
              <span className="text-stone-100 font-bold sm:text-6xl text-4xl">Haiii! {'>.<'}</span>
              <span className="text-stone-100 font-bold sm:text-5xl text-4xl">time for some</span>
            </div>
            <span className="text-chsms-orange font-bold sm:text-8xl text-7xl">chsms!</span>
            <span className="text-stone-100 font-light text-lg mt-2">Login to start gossiping 🤭</span>
          </div>
          <AuthContainer handleFormSubmit={handleSignIn}/>
        </div>
      </div>
    </div>
  )
}

