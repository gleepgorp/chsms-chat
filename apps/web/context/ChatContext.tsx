import React, { createContext, useState, ReactNode, useContext, useEffect, SetStateAction, Dispatch, useRef } from 'react';
import { getChatById } from '../services/chat';
import { getUserById } from '../services/user';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/router';
import { extractInitials } from '../utils';

type ChatProviderType = {
  children: ReactNode;
}

type ChatContextType = {
  selectedChatId: string | null;
  profile: string;
  firstnameInitial: string;
  lastnameInitial: string;
  lastname: string;
  firstname: string;
  recipientId: string;
  fetchingOldMssgs: boolean;
  setFetchingOldMssgs: Dispatch<SetStateAction<boolean>>;
  inputRef: React.RefObject<HTMLInputElement>;
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
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const loggedInUser = user?.uid;
  const chatId = Array.isArray(id) ? id[0] : id || '';
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [profile, setProfile] = useState<string>("");
  const [firstnameInitial, setFirstnameInitial] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastnameInitial, setLastnameInitial] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [recipientId, setRecipientId] = useState<string>("");
  const [fetchingOldMssgs, setFetchingOldMssgs] = useState<boolean>(false);
  const inputRef = useRef(null);

  useEffect(() => {
    async function fetchChat() {
      setSelectedChatId(chatId);
      const chatData = await getChatById(chatId);
      
      const recipient = chatData?.participants?.find(p => p !== loggedInUser);
      const userData = recipient ? await getUserById(recipient) : null

      if (userData && recipient) {
        const profileBg = userData.profileBgColor;
        const profileUrl = userData.profilePicture;
        const profile = !profileUrl ? profileBg : '';
        const firstname = userData.firstname;
        const lastname = userData.lastname;
        const firstnameInital = extractInitials(firstname);
        const lastnameInital = extractInitials(lastname);
        
        setProfile(profile || '');
        setFirstnameInitial(firstnameInital || '');
        setFirstname(firstname || '');
        setLastnameInitial(lastnameInital || '');
        setLastname(lastname || '');
        setRecipientId(recipient || '');

      } else {
        return null;
      }
    }

    fetchChat();
  }, [chatId, loggedInUser])

  return (
    <ChatContext.Provider value={{ 
        inputRef,
        selectedChatId, 
        profile,
        firstnameInitial,
        firstname,
        lastnameInitial,
        lastname,
        recipientId,
        fetchingOldMssgs,
        setFetchingOldMssgs,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
};