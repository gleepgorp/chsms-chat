import React from 'react'

export type TipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TipSize = 'xs' | 'sm' | 'lg';
export type PaddingSize = 'xs' | 'sm' | 'lg';

const paddingSizeClass: Record<TipSize, string> = {
  xs: 'py-1.5 px-2',
  sm: 'py-2 px-2.5',
  lg: 'py-2 px-2',
}

const sizeClass: Record<TipSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  lg: 'text-lg',
}

const placementClass: Record<TipPlacement, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-1',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-1.5',
  left: 'right-full top-1/2 -translate-y-1/2 mr-1', 
  right: 'left-full top-1/2 -translate-y-1/2 ml-1',
}

type TooltipProps = {
  size?: TipSize;
  paddingSize?: PaddingSize
  placement?: TipPlacement;
  children: React.ReactNode | React.ReactNode[];
}

export default function TooltipContent(props: TooltipProps) {
  const { placement = 'bottom', children, size = 'xs', paddingSize = 'xs' } = props;
  const classes = `
    z-50 absolute 
    font-medium
    text-stone-100
    whitespace-nowrap
    bg-stone-900 rounded-md
    ${sizeClass[size]}
    ${placementClass[placement]}
    ${paddingSizeClass[paddingSize]}
  `;
  
  return <div className={classes}>{children}</div>
}

