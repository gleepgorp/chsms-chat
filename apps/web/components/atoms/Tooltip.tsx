import React from 'react'
import { PlacesType, Tooltip as ReactTooltip } from 'react-tooltip';

type TooltipProps = {
  id?: string;
  place?: PlacesType;
  content?: string;
  arrowColor?: string;
}

export default function Tooltip({ id, place = 'bottom', content, arrowColor }: TooltipProps) {
  return (
    <ReactTooltip 
      id={id}
      place={place}
      content={content}
      arrowColor={arrowColor}
    />
  )
}

