import React from 'react';
import { FaEyeSlash, FaEye } from "react-icons/fa";

type PasswordEyeIconProps = {
  isVisible?: boolean;
  onToggle?: () => void;
}

export default function PasswordEyeIcon(props: PasswordEyeIconProps) {
  const { isVisible, onToggle } = props;

  return (
    <div className='p-2' onClick={onToggle}>
      {isVisible ? <FaEye /> : <FaEyeSlash />}
    </div>
  )
}

