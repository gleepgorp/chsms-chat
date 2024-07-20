import React, { useState } from 'react'
import TooltipContent from './TooltipContent'
import { TipPlacement } from './TooltipContent';

type TooltipProps = {
  content: React.ReactNode;
  placement?: TipPlacement;
  children: React.ReactNode;
};

export default function Tooltip(props: TooltipProps) {
  const { content, placement = 'bottom', children } = props;
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      className='relative inline-block'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && 
        <TooltipContent placement={placement}>
        {content}
      </TooltipContent>
      }
    </div>
  )
}

