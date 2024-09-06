import React, { useState } from 'react'
import MeatballMenu from '../atoms/MeatballMenu'
import { ChatEnum, ChatType } from 'types/Chat.type';
import { useAuth } from '../../context/index';
import { convertTimestamp, extractInitials } from '../../utils/index';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ChatProfilePicture from '../atoms/ChatProfilePicture';
import { useChatContext } from '../../context/ChatContext';
import GroupUserProfilePics from '../atoms/GroupUserProfilesPics';

type ChatDetailsProps = {
  fetchedChats: ChatType[];
  isChatLoading: boolean;
  innerRef?: React.Ref<HTMLDivElement>;
}

export default function ChatDetails(props: ChatDetailsProps) {
  const { fetchedChats, innerRef, isChatLoading } = props;
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const { inputRef, setFetchingOldMssgs } = useChatContext();
  const [isOpen, setisOpen] = useState<boolean>(false);
  const [dropdownIndex, setDropdownIndex] = useState<number>(null || 0);
  
  const mappedChats = fetchedChats.map((data, index) => {
  const recipient = data.participants.find(p => p.accountId !== user?.uid);
  const ownerLastMessage = data?.lastMessage?.senderId === user?.uid ? 'You: ' : ''
  const isActive = data.id === id ? 'bg-stone-500/40 hover:bg-stone-500/40' : '';
  const lastMessage = fetchedChats.length === index + 1;
  
  const group: boolean = data.type === ChatEnum.GROUP;
  const noChatName: boolean = data.chatName === "";
  
  const participants = data.participants.map((user, index) => {
    const lastUser = data.participants.length - 1 === index;
    return (
      <span key={index}>{`${user.firstname}${lastUser ? '' : ','} ${' '}`}</span>
    )
  });

  function handleFocus() {
    inputRef.current?.focus();
    setFetchingOldMssgs(false);
  }

  function handleClick(event: any, index: number) {
    event.stopPropagation();
    event.preventDefault();
    setDropdownIndex(index);
    setisOpen(prevIsOpen => !prevIsOpen);
  }

    if (recipient && user) {
      const firstname = recipient.firstname;
      const lastname = recipient.lastname;
      const firstnameInitial = extractInitials(recipient.firstname);
      const lastnameInitial = extractInitials(recipient.lastname);
      const profileBg = recipient.profileBgColor;
      const profilePicture = recipient.profilePicture;
      const profile = !profilePicture ? profileBg : ''
      
      return (
        <Link 
          key={data.id || index}
          onClick={handleFocus}
          href={`/chat/${data.id}`}
        >
          <div 
            ref={lastMessage ? innerRef : null}
            className={
              `${isActive}
              hover:bg-stone-500/20 rounded-xl py-3 px-3 cursor-pointer text-stone-100 flex flex-row items-center justify-between group`
            }
            >
            <div className={`
              flex flex-row 
              items-center relative 
              ${group && 'w-12 h-12' }
              ${!group && 'gap-2.5'}
              `}>
              {!group ? 
                <ChatProfilePicture 
                  profile={profile}
                  firstnameInitial={firstnameInitial}
                  lastnameInitial={lastnameInitial}
                  variant='md'
                />  
                : <GroupUserProfilePics 
                    size='sm'
                    group={group} 
                    noChatName={noChatName}
                    participants={data.participants}
                  />
              }
              <div className={`flex flex-col ${group && 'pl-[58px]'}`}>
                <div className='font-medium text-sm capitalize'>
                  <span className='flex flex-row gap-1 max-w-36 xl:max-w-96'>
                    {group && noChatName ? (
                      <span className='truncate'>{participants}</span>
                    ) : group && !noChatName ? data.chatName
                    : `${firstname} ${lastname}`}
                  </span>
                </div>
                <div className='flex flex-row gap-2 text-sm text-stone-400 whitespace-nowrap'>
                  <span className={`truncate max-w-24 xl:max-w-64 ${data.lastMessage?.read ? 'font-semibold text-stone-100' : ''}`}>
                    {ownerLastMessage} 
                    {data.lastMessage?.content}
                  </span>
                  <span className='font-bold'>·</span>
                  <span>{convertTimestamp(data.lastMessage?.timestamp).formatted}</span>
                </div>
              </div>
            </div>
            <div>
              <MeatballMenu 
                chatId={data.id}
                isHidden={true} 
                participants={data.participants}
                onClick={(e) => handleClick(e, index)} 
                setIsOpen={setisOpen}
                isOpen={isOpen && dropdownIndex === index}
              />
            </div>
          </div>
        </Link>
      )
    }
  })
  
  return <>{mappedChats}</>;
}

