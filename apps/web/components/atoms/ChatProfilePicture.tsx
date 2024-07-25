import React from 'react'

type ProfileVariant = 'sm' | 'md' | 'lg' | 'xs';

type ChatProfilePictureProps = {
  profile?: string;
  firstnameInitial?: string;
  lastnameInitial?: string;
  variant?: ProfileVariant;
}

const variantClass: Record<ProfileVariant, string> = {
  xs: 'w-8 h-8',
  sm: 'w-10 h-10',
  md: 'w-12 h-12',
  lg: 'w-14 h-14'
}

export default function ChatProfilePicture(props: ChatProfilePictureProps) {
  const { profile, firstnameInitial, lastnameInitial, variant = 'md' } = props;
  return (
    <div 
      style={{ backgroundColor: profile }} 
      className={`
        rounded-full
        flex items-center 
        justify-center
        text-stone-100
        ${variantClass[variant]}
      `}
    >
      <span className='uppercase'>
        {`${firstnameInitial}${lastnameInitial}`}
      </span>
    </div>
  )
}

