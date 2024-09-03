import { useModalContext } from "../../context/ModalContext";
import { ReactNode } from "react"

type CreateGroupUserGrid = {
  children: ReactNode;
}

export default function CreateGroupUserGrid(props: CreateGroupUserGrid): JSX.Element {
  const { children } = props;
  const { groupMembers } = useModalContext();

  return (
    <>  
      {/* always condition with length for arrays */}
      {groupMembers.length > 0 &&
      <div className="bg-stone-500/20 rounded-lg p-2 flex flex-row flex-wrap gap-2">
        {children}
      </div>
    }
    </>
  ) 
}