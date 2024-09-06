import { useState } from "react";
import { useModalContext } from "../../context/ModalContext";
import Button from "../atoms/Button";
import ChatSearchContainer from "../atoms/ChatSearchContainer";
import TextInput from "../atoms/TextInput";
import { IoSearchSharp } from "react-icons/io5";
import { useSearchUser } from "../../hooks";
import useDebounce from "../../hooks/useDebounce";
import CreateGroupUserGrid from "./CreateGroupUserGrid";
import UserPill from "../atoms/UserPill";
import { useCreateGroupChat } from "../../hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ChatDTO } from "apps/api/src/app/chat/dto/chat.dto";
import { useAuth } from "../../context";
import { ChatEnum } from "types/Chat.type";

type FormModalProps = {
  isOpen?: boolean;
}

export default function FormModal(props: FormModalProps): JSX.Element {
  const { isOpen } = props;
  const debouncedDelay = 300; 
  const { user } = useAuth();
  const loggedUser = user?.uid;
  const queryClient = useQueryClient();
  const { setIsOpen, setGroupMembers, groupMembers } = useModalContext();

  const groupMembersIds = groupMembers.map(user => user.id);
  const participants = [ loggedUser as string, ...groupMembersIds ]

  const [searchItem, setSearchItem] = useState<string>("");
  const [insufficient, setInsufficient] = useState<string>("");

  const searchItemDebounced = useDebounce(searchItem, debouncedDelay);

  const { data } = useSearchUser(searchItemDebounced);
  const { mutate: createChat } = useCreateGroupChat({
    onSuccess: createChat => {
      queryClient.setQueryData(['CREATE_GROUPCHAT', createChat.id],createChat)
    },
  });

  function handleSearchItem() {                               
    setSearchItem('');
  }

  function handleCancel() {
    setIsOpen(!isOpen);
    setSearchItem('');
    setGroupMembers([]);
    setInsufficient("");
  }
  const initialValues = {
    lastMessageId: "",
    chatName: "",
    creatorId: loggedUser,
    type: ChatEnum.GROUP,
    participants: participants,
    deletedBy: []
  }
  function handleCreateGroupChat(data: ChatDTO) {
    if (groupMembers.length < 2) {
      setInsufficient("Oops, you need more people to create a group.");
    } else {
      createChat({ chatData: data })
      setInsufficient("");
      setIsOpen(!isOpen);
      setSearchItem('');
      setGroupMembers([]);
    }
  }

  return (
    <>
    {isOpen &&
      <div className="fixed z-50 top-0 bottom-0 left-0 right-0 bg-stone-900/70 flex justify-center items-center overflow-hidden">
        <div className="fixed">
          <div className="bg-stone-700 text-stone-100 rounded-lg p-4 flex flex-col gap-2">
            <div className="flex justify-center items-center">
              <span className="font-semibold text-center text-xl flex-1">Create group chat</span>
            </div>
            <span className="text-center px-6 text-[15px] text-stone-300">Search people up and create your group chat!</span>
            <div className='bg-stone-700/20 h-full rounded-lg p-3 flex flex-col gap-2 w-[520px]'>
              <div className='flex flex-col gap-3'>
                <TextInput 
                  type='text'
                  forModal={true}
                  value={searchItem}
                  searchItem={searchItem}
                  handleSearchItem={handleSearchItem}
                  placeholder='Add someone to the group' 
                  onChange={(e) => setSearchItem(e.target.value)}
                  adornment={<IoSearchSharp />}
                  />
              </div>
              <CreateGroupUserGrid>
                <UserPill />
              </CreateGroupUserGrid>
              { groupMembers.length < 2 ? <span className="text-sm text-red-400">{insufficient}</span> : null }
              <div className='overflow-y-auto overflow-x-hidden max-h-96 bg-stone-500/20 rounded-lg'>
                {searchItem && 
                  <ChatSearchContainer 
                    forModal={true}
                    handleSearchItem={handleSearchItem}
                    data={data || []}
                  /> 
                } 
              </div>
            </div>
            <div className="flex flex-row justify-between gap-2">
              <Button width="full" variant="gray" onClick={handleCancel}>
                Cancel
              </Button>
              <Button width="full" onClick={() => handleCreateGroupChat(initialValues)}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
    }
    </>
  )
}