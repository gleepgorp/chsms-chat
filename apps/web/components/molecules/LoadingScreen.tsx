import React from 'react'
import LoadingSpinner from '../atoms/LoadingSpinner'

type LoadingScreenSize = 'sm' | 'md' | 'lg';
type LoadingScreenProps = {
  size?: LoadingScreenSize;
};

export default function LoadingScreen({ size }: LoadingScreenProps) {
  return (
    <div className='absolute w-full h-full z-99 flex items-center justify-center'>
      <LoadingSpinner size={size}/>
    </div>
  )
}

