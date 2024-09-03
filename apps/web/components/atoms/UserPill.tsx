import { IoClose } from "react-icons/io5";
import Button from "./Button";
import { useModalContext } from "../../context/ModalContext";
import { useEffect } from "react";

// type UserPill = {

// }

export default function UserPill(): JSX.Element {
  const { groupMembers, groupMembersIds, setGroupMembers, setGroupMembersIds } = useModalContext();

  function handleRemove(index: number) {
    const updatedMembers = groupMembers.filter((_, i) => i !== index);
    const updatedIds = groupMembersIds.filter((_, i) => i !== index);
    setGroupMembers(updatedMembers);
    setGroupMembersIds(updatedIds);
  }

  const mappedData = groupMembers.map((member, index) => {

    return (
      <div key={index} className="bg-stone-500/70 p-1.5 rounded-md text-sm whitespace-nowrap flex flex-row items-center gap-2 capitalize">
        <span>{member}</span>
        <Button
          size='svg'
          variant='noBg'
          roundedSize='full'
          onClick={() => handleRemove(index)}
        >
          <IoClose />
        </Button>
      </div>
    )
  })

  return (
    <>{mappedData}</>
  )
}