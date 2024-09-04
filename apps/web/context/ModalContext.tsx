import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { UserGroupType } from "types/Chat.type";

type ModalProviderType = {
  children: ReactNode;
}

type ModalContextType = {
  chatId: string;
  isOpen: boolean;
  modalType: string;
  setChatId: Dispatch<SetStateAction<string>>;
  setModalType: Dispatch<SetStateAction<string>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  groupMembers: UserGroupType[];
  setGroupMembers: Dispatch<SetStateAction<UserGroupType[]>>;
}

export const ModalContext = createContext<ModalContextType | null>(null);

export function useModalContext(): ModalContextType {
  const context = useContext(ModalContext);
    if (context === null) {
      throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
}

export default function ModalProvider(props: ModalProviderType): JSX.Element {
  const { children } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chatId, setChatId] = useState<string>("");
  const [modalType, setModalType] = useState<string>("");
  const [groupMembers, setGroupMembers] = useState<{ user: string, id: string }[]>([]);

  return (
    <ModalContext.Provider value={{
      chatId,
      isOpen,
      modalType,
      groupMembers,
      setGroupMembers,
      setIsOpen,
      setChatId,
      setModalType
    }}>
      {children}
    </ModalContext.Provider>
  )
}