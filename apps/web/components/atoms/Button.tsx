import React from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'gray' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonWidth = 'full' | 'standard';

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  adornment?:boolean;
  width?: ButtonWidth;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-chsms-orange hover:bg-chsms-orange/90 text-stone-100 active:scale-95',
  secondary: 'bg-stone-700/10 hover:bg-stone-700/50 text-stone-100 active:scale-95',
  gray: 'bg-stone-400 text-stone-100 hover:bg-stone-400/90',
  link: 'bg-none text-stone-400 active:scale-95 text-sm'
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg'
}

const widthClasses: Record<ButtonWidth, string> = {
  full: 'w-full',
  standard: '',
}

export default function Button({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  adornment = false,
  width = 'standard',
}: ButtonProps) {
  const Component = typeof href === 'string' ? Link : 'button';

  const classes = `
    text-sm
    font-semibold
    rounded-lg
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${widthClasses[width]}
    ${disabled ? 'opacity-50 pointer-events-none' : ''}
  `;

  const adornmentClass = `
    ${adornment ? 'flex flex-row gap-4' : ''}
  `;

  return (
    <Component
      className={classes}
      href={href as string}
      type={type}
      onClick={onClick}
    >
      <div className={adornmentClass}>
        {children}
      </div>
    </Component>
  )
}

