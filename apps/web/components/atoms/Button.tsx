import React from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'gray' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-chsms-orange hover:bg-chsms-orange/90 text-stone-100 active:scale-95',
  secondary: 'border border-stone-400 text-stone-400 hover:text-stone-100 hover:bg-stone-400 active:scale-95',
  gray: 'bg-stone-400 text-stone-100 hover:bg-stone-400/90',
  link: 'bg-none text-stone-400 active:scale-95 text-sm'
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg'
}

export default function Button({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false
}: ButtonProps) {
  const Component = typeof href === 'string' ? Link : 'button';

  const classes = `
    text-sm
    font-semibold
    rounded-lg
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabled ? 'opacity-50 pointer-events-none' : ''}
  `;

  return (
    <Component
      className={classes}
      href={href as string}
      type={type}
      onClick={onClick}
    >
      {children}
    </Component>
  )
}

