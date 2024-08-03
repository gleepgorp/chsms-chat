import { ReactNode, useContext, createContext, useState } from "react";

type NewChatProviderType = {
  children: ReactNode;
}

type NewChatContextType = {
  profile: string;
  firstnameInitial: string;
  lastnameInitial: string
  lastname: string
  firstname: string
  recipientId: string
  setProfile: React.Dispatch<React.SetStateAction<string>>;
  setFirstnameInitial: React.Dispatch<React.SetStateAction<string>>;
  setLastnameInitial: React.Dispatch<React.SetStateAction<string>>;
  setLastname: React.Dispatch<React.SetStateAction<string>>;
  setFirstname: React.Dispatch<React.SetStateAction<string>>;
  setRecipientId: React.Dispatch<React.SetStateAction<string>>;
}

export const NewChatContext = createContext<NewChatContextType | null>(null);

export function useNewChatContext(): NewChatContextType {
  const context = useContext(NewChatContext);
  if (context === null) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}

export default function NewChatProvider(props: NewChatProviderType): JSX.Element {
  const { children } = props;
  const [profile, setProfile] = useState<string>("");
  const [firstnameInitial, setFirstnameInitial] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastnameInitial, setLastnameInitial] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [recipientId, setRecipientId] = useState<string>("");

  return (
    <NewChatContext.Provider value={{
      profile,
      firstnameInitial,
      lastnameInitial,
      lastname,
      firstname,
      recipientId,
      setProfile,
      setFirstnameInitial,
      setLastnameInitial,
      setLastname,
      setFirstname,
      setRecipientId,
    }}>
      {children}
    </NewChatContext.Provider>
  )
}