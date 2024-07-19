import React, { ChangeEvent, ReactNode } from 'react'

type TextInputProps = {
  type?: string;
  label?: string;
  placeholder?: string; 
  adornment?: ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function TextInput(props: TextInputProps): JSX.Element {
  const { type, label, placeholder, adornment, onChange } = props;

  return (
    <div className='relative flex items-center'>
      {adornment && (
        <div className='absolute left-0 pl-4'>
          <div className='cursor-pointer rounded-md text-stone-400'>
          {adornment}
          </div>
        </div>
      )}
      <input 
        type={type}
        placeholder={placeholder}
        className='
          outline-none    
          py-2 pr-4 pl-10
          bg-stone-600/40
          text-stone-100
          w-full rounded-full
          placeholder:text-stone-400
          '
      />
    </div>
  )
}

