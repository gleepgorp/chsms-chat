import { ProfileType } from "types/Profile.type";

type ChatDropdownMenu = {
  children: React.ReactNode;
  isOpen?: boolean;
  participants: ProfileType[],
};

export default function ChatDropdownMenu(props: ChatDropdownMenu): JSX.Element {
  const { children, isOpen, participants } = props;
  
  return (
   <>
    {isOpen &&
      <div className="text-stone-100 bg-[#3D3B38] absolute rounded-lg -translate-x-1/2 mt-6 z-50 shadow w-48">
        <div className="p-1.5">
          {children}
        </div>
      </div>
    }
   </> 
  )
}