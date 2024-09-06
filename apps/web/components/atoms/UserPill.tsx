import { IoClose } from "react-icons/io5";
import Button from "./Button";
import { useModalContext } from "../../context/ModalContext";
import { useEffect } from "react";
import { useAuth } from "../../context";
import { UserGroupType } from "types/Chat.type";

// type UserPill = {

// }

export default function UserPill(): JSX.Element {
  const { groupMembers, setGroupMembers } = useModalContext();
  const { user, profile } = useAuth();
  const userId = user && user.uid;
  const loggedUserFullname = `${profile?.firstname} ${profile?.lastname}`
  const loggedUser: UserGroupType = { user: loggedUserFullname, id: userId as string};

  function handleRemove(id: string) {
    const updatedMembers = groupMembers.filter((member) => member.id !== id);
    setGroupMembers(updatedMembers);
    console.log(updatedMembers);
  }

  const excludeLoggedUser = groupMembers.filter(doc => doc.id !== loggedUser.id);
  const mappedData = excludeLoggedUser.map((member, index) => {

    return (
      <div key={member.id || index} className="bg-stone-500/70 p-1.5 rounded-md text-sm whitespace-nowrap flex flex-row items-center gap-2 capitalize">
        <span>{member.user}</span>
        <Button
          size='svg'
          variant='noBg'
          roundedSize='full'
          onClick={() => handleRemove(member.id)}
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