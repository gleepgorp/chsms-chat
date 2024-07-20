import React from 'react'

export type TipPlacement = 'top' | 'bottom' | 'left' | 'right';

const placementClass: Record<TipPlacement, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-1',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-1.5',
  left: 'right-full top-1/2 -translate-y-1/2 mr-1', 
  right: 'left-full top-1/2 -translate-y-1/2 ml-1',
}

type TooltipProps = {
  placement?: TipPlacement;
  children: React.ReactNode | React.ReactNode[];
}

export default function TooltipContent(props: TooltipProps) {
  const { placement = 'bottom', children } = props;
  const classes = `
    z-50
    text-xs px-2 py-1.5
    absolute 
    font-medium
    text-stone-100
    whitespace-nowrap
    bg-stone-900
    rounded-md
    ${placementClass[placement]}
  `;
  
  return <div className={classes}>{children}</div>
}

