import { Dispatch, SetStateAction, useEffect } from "react";
import { ProfileType } from "types/Profile.type";

type ChatDropdownMenu = {
  isOpen?: boolean;
  children: React.ReactNode;
  participants: ProfileType[];
  menuRef: React.Ref<HTMLDivElement>;
  setIsOpen: (isOpen: boolean) => void;
};

export default function ChatDropdownMenu(props: ChatDropdownMenu): JSX.Element {
  const { children, isOpen, participants, setIsOpen } = props;
  
  return (
   <>
    {isOpen &&
      <div className="text-stone-100 bg-[#3D3B38] absolute rounded-lg -translate-x-1/2 mt-6 z-40 shadow w-48">
        <div className="p-1.5">
          {children}
        </div>
      </div>
    }
   </> 
  )
}