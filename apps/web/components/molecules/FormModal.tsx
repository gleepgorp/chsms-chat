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

type FormModalProps = {
  isOpen?: boolean;
}

export default function FormModal(props: FormModalProps): JSX.Element {
  const { isOpen } = props;
  const debouncedDelay = 300; 
  const { setIsOpen, setGroupMembers, setGroupMembersIds, groupMembersIds } = useModalContext();
  const [searchItem, setSearchItem] = useState<string>("");
  const searchItemDebounced = useDebounce(searchItem, debouncedDelay);
  const { data } = useSearchUser(searchItemDebounced);

  function handleSearchItem() { 
    setSearchItem('');
  }

  function handleCancel() {
    setIsOpen(!isOpen);
    setSearchItem('');
    setGroupMembers([]);
    setGroupMembersIds([]);
  }

  function handleCreateGroupChat() {
    console.log(groupMembersIds);
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
            <div className='bg-stone-700/20 h-full rounded-lg p-3 flex flex-col gap-2 max-w-[520px]'>
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
              <Button width="full" onClick={handleCreateGroupChat}>
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