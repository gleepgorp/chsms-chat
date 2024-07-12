
import Image from 'next/image';
import LoginInput from 'apps/web/components/molecules/LoginForm';

export default function Login () {
  return (
    <div className='mx-60 my-40'>
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
              <span className="text-stone-100 font-bold text-6xl">Haiii! {'>.<'}</span>
              <span className="text-stone-100 font-bold text-5xl">time for some</span>
            </div>
            <span className="text-chsms-orange font-bold text-8xl">chsms!</span>
            <span className="text-stone-100 font-light text-lg mt-2">Login to start gossiping 🤭</span>
          </div>
          <LoginInput />
        </div>
      </div>
    </div>
  )
}

