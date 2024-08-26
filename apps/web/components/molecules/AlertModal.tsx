import { useModalContext } from "apps/web/context/ModalContext";
import Button from "../atoms/Button";

type AlertModalProps = {
  isOpen?: boolean;
  chatId: string;
  onClick?: () => void;
}

export default function AlertModal(props: AlertModalProps): JSX.Element {
  const { isOpen, chatId } = props;
  const { setIsOpen, setChatId } = useModalContext();
  
  function handleCancel() {
    setIsOpen(!isOpen);
    setChatId("");
  }

  function handleDeleteChat() {
    console.log("Hello");
  }

  return (
    <>
    {isOpen && 
      <div className="fixed z-50 top-0 bottom-0 left-0 right-0 bg-stone-900/70 flex justify-center items-center overflow-hidden">
        <div className="fixed">
          <div className="bg-stone-700 text-stone-100 rounded-lg p-4 flex flex-col gap-2">
            <div className="flex justify-center items-center">
              <span className="font-semibold text-center text-xl flex-1">Delete Chat</span>
            </div>
            <span className="text-center px-6 text-[15px] text-stone-300">This conversation will be deleted forever, confirm?</span>
            <div className="flex flex-row justify-between gap-2">
              <Button 
                width="full" 
                variant="gray"
                onClick={handleCancel}
              >
                  Cancel
              </Button>
              <Button 
                width="full" 
                onClick={handleDeleteChat}
              >
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