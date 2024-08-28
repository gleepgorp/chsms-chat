import { useState } from "react";
import { useModalContext } from "../../context/ModalContext";
import Button from "../atoms/Button";
import ChatSearchContainer from "../atoms/ChatSearchContainer";
import TextInput from "../atoms/TextInput";
import { IoSearchSharp } from "react-icons/io5";
import { useSearchUser } from "../../hooks";
import useDebounce from "../../hooks/useDebounce";

type FormModalProps = {
  isOpen?: boolean;
}

export default function FormModal(props: FormModalProps): JSX.Element {
  const { isOpen } = props;
  const debouncedDelay = 300; 
  const { setIsOpen } = useModalContext();
  const [searchItem, setSearchItem] = useState<string>("");
  const searchItemDebounced = useDebounce(searchItem, debouncedDelay);
  const { data } = useSearchUser(searchItemDebounced);

  function handleSearchItem() {
    setSearchItem('');
  }

  function handleCancel() {
    setIsOpen(!isOpen);
  }

  function handleCreateGroupChat() {
    console.log("hello world");
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
            <div className='bg-stone-700/20 h-full rounded-lg p-3 flex flex-col'>
              <div className='flex flex-col gap-3'>
                <div className='pb-3'>
                  <TextInput 
                    type='text'
                    value={searchItem}
                    searchItem={searchItem}
                    handleSearchItem={handleSearchItem}
                    placeholder='Add someone to the group' 
                    onChange={(e) => setSearchItem(e.target.value)}
                    adornment={<IoSearchSharp />}
                    />
                </div>
              </div>
              <div className='overflow-y-auto overflow-x-hidden h-full'>
                {searchItem && 
                  <ChatSearchContainer 
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