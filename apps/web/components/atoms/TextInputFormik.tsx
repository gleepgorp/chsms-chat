import { ChangeEvent, HTMLProps, ReactNode } from 'react';
import { FieldProps } from 'formik';
import Label from './Label';
import { InputVariants } from '../../constants/input';
import { useChatContext } from '../../context/ChatContext';

type InputVariant = 'auth' | 'standard';

const variantClass: Record<InputVariant, string> = {
  auth: 'bg-stone-100 rounded-lg text-stone-800',
  standard: 'bg-stone-600/40 rounded-full text-stone-100'
}

export type TextInputFormikProps = HTMLProps<HTMLInputElement> & FieldProps & {
  id: string; 
  type?: string;
  label?: string;
  showLabel?: boolean;
  placeholder?: string; 
  errorMessage?: string;
  endadornment?: ReactNode;
  disabled?:boolean;
  autoComplete?: string;
  variant: InputVariant;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function TextInputFormik({ field, form, ...props }: TextInputFormikProps): JSX.Element {
  const { name } = field;
  const { errors, touched } = form;
  const { inputRef } = useChatContext();
  const errorMessage = touched[name] && errors[name] ? errors[name] as string : undefined;

  return (
    <Label
      errorMessage={props.variant === InputVariants.STANDARD ? '' : errorMessage}
      isVisible={!!props.label}
      label={props.showLabel ? props.label : ''}
      labelVariant={errorMessage ? 'error' : 'standard'}
    >
      <input 
        ref={inputRef}
        {...field}
        {...props}
        id={props.id || name}
        autoComplete={props.autoComplete}
        className={
          ` 
            ${props.variant === InputVariants.STANDARD  ? '' : ''} 
            ${props.disabled ? 'opacity-50 pointer-events-none' : ''}
            ${variantClass[props.variant]}
            ${props.showLabel ? 'pb-2 pt-[18px] px-3 placeholder-transparent' : 'p-3'}
            peer outline-none text-sm w-full 
          ` 
        }
      />
      {props.endadornment && (
        <div className={`${errorMessage ? 'top-0 bottom-4' : 'inset-y-0'} absolute right-0 flex items-center pr-3`}>
          <div className='cursor-pointer rounded-md text-stone-600 hover:bg-stone-200'>
            {props.endadornment}
          </div>
        </div>
      )}
    </Label>
  )
}
