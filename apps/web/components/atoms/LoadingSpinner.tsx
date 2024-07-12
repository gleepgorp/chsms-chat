import React from 'react'
import { CgSpinner } from "react-icons/cg";

type LoadingSpinnerSize = 'sm' | 'md' | 'lg';
type LoadingSpinnerProps = {
  size?: LoadingSpinnerSize;
};
const sizeClasses: Record<LoadingSpinnerSize, string> = {
  sm: 'text-2xl',
  md: 'text-4xl',
  lg: 'text-6xl',
};

export default function LoadingSpinner({ size = 'sm' }: LoadingSpinnerProps) {
  return (
    <div className='flex items-center justify-center'>
      <CgSpinner 
        className={`
          animate-spin 
          text-stone-100 
          ${sizeClasses[size]}
        `
        }
      />
    </div>
  )
}

