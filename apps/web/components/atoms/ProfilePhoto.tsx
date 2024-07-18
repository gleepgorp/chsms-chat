import React, { useEffect } from 'react'
import Tooltip from './Tooltip';
import { extractInitials } from '../../utils/extractInitials.util';

type ProfilePhotoProps = {
  profileUrl?: string;
  firstname?: string;
  lastname?: string;
  bgColor?: string;
}

export default function ProfilePhoto(props: ProfilePhotoProps) {
  const { profileUrl, firstname, lastname, bgColor } = props;
  const defaultBg ='#424d54';
  
  return (
    <>
      <div 
        style={{ backgroundColor: bgColor || defaultBg }}
        data-tooltip-id='upload-photo' 
        className='cursor-pointer flex items-center justify-center rounded-full w-44 h-44'
      >
      {!profileUrl && 
          <label className='cursor-pointer w-full h-full flex items-center justify-center' htmlFor='upload'>
            <div className='text-stone-100 text-6xl'>
              {extractInitials(firstname)}{extractInitials(lastname)} 
              <input id='upload' type="file" className='hidden' accept='image/*'/>
            </div>
          </label>
        }
      </div>
      <Tooltip 
        id='upload-photo'
        place='bottom'
        content='Upload photo'
        arrowColor='transparent'
      />
    </>
  )
}

