import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type ModalProviderType = {
  children: ReactNode;
}

type ModalContextType = {
  chatId: string;
  isOpen: boolean;
  setChatId: Dispatch<SetStateAction<string>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
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

  return (
    <ModalContext.Provider value={{
      chatId,
      isOpen,
      setIsOpen,
      setChatId,
    }}>
      {children}
    </ModalContext.Provider>
  )
}