import React, { useEffect, useRef, useState } from 'react'
import TooltipContent, { PaddingSize } from './TooltipContent'
import { TipPlacement } from './TooltipContent';
import { TipSize } from './TooltipContent';

type TooltipProps = {
  size?: TipSize;
  content?: React.ReactNode;
  placement?: TipPlacement;
  children: React.ReactNode;
  paddingSize?: PaddingSize;
};

export default function Tooltip(props: TooltipProps) {
  const { content, placement = 'bottom', children, size = 'sm', paddingSize = 'xs' } = props;
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleMouseEnter() {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 300);
  }

  function handleMouseLeave() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(false);
  }

  return (
    <>
      <div
        className='relative inline-block'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
        {isHovered && 
          <TooltipContent content={content} placement={placement} size={size} paddingSize={paddingSize}>
            {content}
          </TooltipContent>
        }
      </div>
    </>
  )
}

