import React from 'react';

type LabelVariant = 'standard' | 'error';
const variantClasses: Record<LabelVariant, string> = {
  standard: 'text-stone-800/50',
  error: 'text-red-500'
};  

type LabelProps = {
  errorMessage?: string;
  label?: string;
  isVisible?: boolean;
  labelVariant?: LabelVariant;
  children?: React.ReactNode;
  htmlFor?: string;
}

export default function Label({
  errorMessage,
  label,
  isVisible,
  labelVariant = 'standard',
  children,
  htmlFor
}: LabelProps) {
  const classes = `
    font-semibold
    text-xs
    absolute
    top-1
    left-3
    peer-placeholder-shown:text-base
    peer-placeholder-shown:text-gray-400
    peer-placeholder-shown:font-normal
    peer-placeholder-shown:top-2
    peer-focus:text-xs
    peer-focus:top-1
    peer-focus:font-semibold
    pointer-events-none
    ${variantClasses[labelVariant]}
  `
  if (!isVisible) return null;

  return (
    <div className="flex flex-col gap-1 relative">
      {children}
      <label htmlFor={htmlFor} className={classes}>
        {label}
      </label>
      {errorMessage && <span className="text-xs text-red-400">{errorMessage}</span>}
    </div>
  )
}

