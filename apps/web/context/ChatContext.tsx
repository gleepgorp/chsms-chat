import React, { createContext, useState, ReactNode, useContext, useEffect, SetStateAction, Dispatch, useRef } from 'react';
import { getChatById } from '../services/chat';
import { getUserById, getUsersByIds } from '../services/user';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/router';
import { extractInitials } from '../utils';
import { ChatEnum } from 'types/Chat.type';
import { ProfileType } from 'types/Profile.type';

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
  recipientIds: ProfileType[];
  fetchingOldMssgs: boolean;
  isGroup: boolean;
  groupParticipants: ProfileType[];
  setFetchingOldMssgs: Dispatch<SetStateAction<boolean>>;
  setIsGroup: Dispatch<SetStateAction<boolean>>;
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
  const chatPath = router.pathname.includes('/chat');
  const loggedInUser = user?.uid;
  const { id } = router.query;
  const chatId = Array.isArray(id) ? id[0] : id || '';
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [profile, setProfile] = useState<string>("");
  const [firstnameInitial, setFirstnameInitial] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastnameInitial, setLastnameInitial] = useState<string>("");
  const [groupParticipants, setGroupParticipants] = useState<ProfileType[]>([]);
  const [lastname, setLastname] = useState<string>("");
  const [recipientIds, setRecipientIds] = useState<ProfileType[]>([]);
  const [fetchingOldMssgs, setFetchingOldMssgs] = useState<boolean>(false);
  const [isGroup, setIsGroup] = useState<boolean>(false);
  const inputRef = useRef(null);

  useEffect(() => {
    async function fetchChat() {
      setSelectedChatId(chatId);
      const chatData = await getChatById(chatId);

      if (chatPath) {
        const isGroupChat = chatData?.type === ChatEnum.GROUP;
        setIsGroup(isGroupChat);
        const recipients = chatData?.participants?.filter(p => p !== loggedInUser);
        
        if (chatData?.participantsDetails && recipients) {
          const recipient = chatData.participantsDetails.find(user => user.id !== loggedInUser)
          if (recipient) {
            const profileBg = recipient.profileBgColor;
            const profileUrl = recipient.profilePicture;
            const profile = !profileUrl ? profileBg : '';
            const firstname = recipient.firstname;
            const lastname = recipient.lastname;
            const firstnameInital = extractInitials(firstname);
            const lastnameInital = extractInitials(lastname);
            
            setProfile(profile || '');
            setFirstnameInitial(firstnameInital || '');
            setFirstname(firstname || '');
            setLastnameInitial(lastnameInital || '');
            setLastname(lastname || '');
            setGroupParticipants(chatData.participantsDetails || []);
            setRecipientIds(recipients);
          }
        } else {
          return null;
        }
      }
    }

    fetchChat();
  }, [chatId, chatPath, loggedInUser])

  return (
    <ChatContext.Provider value={{ 
        inputRef,
        selectedChatId, 
        profile,
        firstnameInitial,
        firstname,
        lastnameInitial,
        lastname,
        recipientIds,
        fetchingOldMssgs,
        isGroup,
        setFetchingOldMssgs,
        setIsGroup,
        groupParticipants,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
};