import React, { useCallback, useRef, useState } from 'react'
import TooltipContent, { PaddingSize } from './TooltipContent'
import { TipPlacement } from './TooltipContent';
import { TipSize } from './TooltipContent';

type TooltipProps = {
  size?: TipSize;
  content: React.ReactNode;
  placement?: TipPlacement;
  children: React.ReactNode;
  paddingSize?: PaddingSize;
};

export default function Tooltip(props: TooltipProps) {
  const { content, placement = 'bottom', children, size = 'sm', paddingSize = 'xs' } = props;
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const showTooltip = useCallback(() => {
    const timer = setTimeout(() => setIsHovered(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className='relative inline-block'
      onMouseEnter={showTooltip}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && 
        <TooltipContent placement={placement} size={size} paddingSize={paddingSize}>
        {content}
      </TooltipContent>
      }
    </div>
  )
}

