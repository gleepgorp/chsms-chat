import React from 'react'

export type ProfileVariant = 'sm' | 'md' | 'lg' | 'xs';

type ChatProfilePictureProps = {
  profile?: string;
  firstnameInitial?: string;
  lastnameInitial?: string;
  variant?: ProfileVariant;
  group?: boolean;
  noChatName?: boolean;
}

const variantClass: Record<ProfileVariant, string> = {
  xs: 'w-7 h-7',
  sm: 'w-9 h-9',
  md: 'w-12 h-12',
  lg: 'w-14 h-14'
}

export default function ChatProfilePicture(props: ChatProfilePictureProps) {
  const { profile, firstnameInitial, lastnameInitial, variant = 'md', group, noChatName } = props;
  return (
    <div 
      style={{ backgroundColor: profile }} 
      className={`
        rounded-full
        flex items-center 
        justify-center
        text-stone-100
        ${noChatName && group ? 'text-xs' : ''}
        ${variantClass[variant]}
      `}
    >
      <span className='uppercase'>
        {`${firstnameInitial}${lastnameInitial}`}
      </span>
    </div>
  )
}

