import React, { ChangeEvent, ReactNode } from 'react'
import { IoArrowBack, IoClose } from "react-icons/io5";
import Button from './Button';

type TextInputProps = {
  type?: string;
  label?: string;
  value?: string;
  placeholder?: string; 
  adornment?: ReactNode;
  isChatPath?: boolean;
  searchItem: string;
  forModal?: boolean
  handleSearchItem: () => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function TextInput(props: TextInputProps): JSX.Element {
  const { type, label, placeholder, adornment, onChange, value, searchItem, handleSearchItem, forModal } = props;

  return (
    <div className='relative flex flex-row items-center gap-3'>
      {searchItem && 
        <div className={`${forModal && 'absolute right-0 z-50 pr-1'}`}>
          <Button
            size='icon'
            variant='icon'
            roundedSize='full'
            onClick={handleSearchItem}
          >
            {forModal ? <IoClose className='text-stone-400/60 text-lg'/> : <IoArrowBack className='text-stone-400/60 text-2xl'/>}
          </Button>
        </div>
      } 
      <div className='relative flex items-center w-full'>
        {adornment && (
          <div className='absolute left-0 pl-4'>
            <div className='cursor-pointer rounded-md text-stone-400'>
            {adornment}
            </div>
          </div>
        )}
        <input 
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className='
            outline-none    
            py-2 pr-4 pl-10
            bg-stone-600/40
            text-stone-100
            w-full rounded-full
            placeholder:text-stone-400'
        />
      </div>
    </div>
  )
}

