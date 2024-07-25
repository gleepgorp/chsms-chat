import React, { useEffect } from 'react'
import MeatballMenu from '../atoms/MeatballMenu'
import { ChatType } from 'types/Chat.type';
import { useAuth } from '../../context/index';
import { convertTimestamp } from '../../utils/index';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useChatContext } from '../../context/ChatContext';
import ChatProfilePicture from '../atoms/ChatProfilePicture';

type ChatDetailsProps = {
  fetchedChats: ChatType[];
  isChatLoading: boolean;
}

export default function ChatDetails(props: ChatDetailsProps) {
  const { fetchedChats, isChatLoading } = props;
  const { 
    setSelectedChatId, 
    setFirstnameInitial, 
    setLastnameInitial, 
    setProfile, 
    setFirstname, 
    setLastname, 
    setRecipientId } = useChatContext();
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const mappedChats = fetchedChats.map((data, index) => {
    const recipient = data.participants.find(p => p.accountId !== user?.uid);

    if (recipient && user) {
      const firstname = recipient.firstname;
      const lastname = recipient.lastname;
      const firstnameInitial = recipient.firstname.charAt(0);
      const lastnameInitial = recipient.lastname.charAt(0);
      const profileBg = recipient.profileBgColor;
      const profilePicture = recipient.profilePicture;
      const profile = !profilePicture ? profileBg : ''
      const ownerLastMessage = data.lastMessage.senderId === user.uid ? 'You: ' : ''
      const isActive = data.id === id ? 'bg-stone-500/40 hover:bg-stone-500/40' : ''
      
      const handleChatSelect = (chatId: string) => {
        setSelectedChatId(chatId);
        setFirstnameInitial(firstnameInitial);
        setLastnameInitial(lastnameInitial);
        setFirstname(firstname);
        setLastname(lastname);
        setProfile(profile);
        setRecipientId(recipient.id);
      }
      
      return (
        <Link 
          key={index}
          onClick={() => handleChatSelect(data.id)}
          href={`/chat/${data.id}`} 
        >
          <div 
            className={
              `${isActive}
              hover:bg-stone-500/20 rounded-xl py-3 px-3 cursor-pointer text-stone-100 flex flex-row items-center justify-between group`
            }
            >
            <div className='flex flex-row items-center gap-2.5'>
              <ChatProfilePicture 
                profile={profile}
                firstnameInitial={firstnameInitial}
                lastnameInitial={lastnameInitial}
                variant='md'
              />
              <div className='flex flex-col'>
                <span className='font-medium text-sm capitalize'>
                  {`${firstname} ${lastname}`}
                </span>
                <div className='flex flex-row gap-2 text-sm text-stone-400 whitespace-nowrap'>
                  <span className='truncate max-w-64'>
                    {ownerLastMessage} 
                    {data.lastMessage.content}
                  </span>
                  <span className='font-bold'>·</span>
                  <span>{convertTimestamp(data.lastMessage.timestamp).formatted}</span>
                </div>
              </div>
            </div>
            <div>
              <MeatballMenu isHidden={true}/>
            </div>
          </div>
        </Link>
      )
    }
  })
  
  return <>{mappedChats}</>;
}

