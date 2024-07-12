import { ChangeEvent, HTMLProps, ReactNode } from 'react';
import { FieldProps } from 'formik';
import Label from './Label';

export type TextInputProps = HTMLProps<HTMLInputElement> & FieldProps & {
  id: string; 
  type?: string;
  label?: string;
  placeholder?: string; 
  errorMessage?: string;
  endAdornment?: ReactNode;
  disabled?:boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function TextInput({ field, form, ...props }: TextInputProps): JSX.Element {
  const { name } = field;
  const { errors, touched } = form;
  const errorMessage = touched[name] && errors[name] ? errors[name] as string : undefined;

  return (
    <Label
      label={props.label}
      isVisible={!!props.label}
      errorMessage={errorMessage}
      labelVariant={errorMessage ? 'error' : 'standard'}
    >
      <input 
        {...field}
        {...props}
        id={props.id || name}
        className={
          `
            ${errorMessage ? 'ring-2 ring-inset ring-red-400' : ''} 
            ${props.disabled ? 'opacity-50 pointer-events-none' : ''}
            peer bg-stone-100 outline-none pb-2 pt-[18px] px-3 rounded-lg text-sm text-stone-800 w-full placeholder-transparent
          `
        }
      />
      {props.endAdornment && (
        <div className={`${errorMessage ? 'top-0 bottom-4' : 'inset-y-0'} absolute right-0 flex items-center pr-3`}>
          <div className='cursor-pointer rounded-md text-stone-600 hover:bg-stone-200'>
            {props.endAdornment}
          </div>
        </div>
      )}
    </Label>
  )
}
