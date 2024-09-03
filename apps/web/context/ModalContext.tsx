import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

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
  groupMembers: string[];
  setGroupMembers: Dispatch<SetStateAction<string[]>>;
  groupMembersIds: string[];
  setGroupMembersIds: Dispatch<SetStateAction<string[]>>;
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
  const [groupMembers, setGroupMembers] = useState<string[]>([]);
  const [groupMembersIds, setGroupMembersIds] = useState<string[]>([]);

  return (
    <ModalContext.Provider value={{
      chatId,
      isOpen,
      modalType,
      groupMembers,
      setGroupMembers,
      groupMembersIds,
      setGroupMembersIds,
      setIsOpen,
      setChatId,
      setModalType
    }}>
      {children}
    </ModalContext.Provider>
  )
}