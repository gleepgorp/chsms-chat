import React, { createContext, useState, ReactNode, useContext } from 'react';

type ChatProviderType = {
  children: ReactNode;
}

type ChatContextType = {
  selectedChatId: string | null;
  setSelectedChatId: (id: string) => void;
  profile: string;
  setProfile: (url: string) => void;
  firstnameInitial: string;
  setFirstnameInitial: (fInitial: string) => void;
  lastnameInitial: string
  setLastnameInitial: (lInitial: string) => void;
  lastname: string
  setLastname: (lastname: string) => void;
  firstname: string
  setFirstname: (firstname: string) => void;
}

export const ChatContext = createContext<ChatContextType | null>(null);

export function useChatContext(): ChatContextType {
  const context = useContext(ChatContext);
  if (context === null) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}

export default function ChatProvider(props: ChatProviderType): JSX.Element {
  const  { children } = props;
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [profile, setProfile] = useState<string>("");
  const [firstnameInitial, setFirstnameInitial] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastnameInitial, setLastnameInitial] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");

  return (
    <ChatContext.Provider value={{ 
        selectedChatId, 
        setSelectedChatId,
        profile,
        setProfile,
        firstnameInitial,
        firstname,
        setFirstnameInitial,
        setFirstname,
        lastnameInitial,
        setLastnameInitial,
        lastname,
        setLastname,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
};