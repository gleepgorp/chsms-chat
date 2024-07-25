import ChatLayout from "../layout/ChatLayout";
import { useAuth } from "../context";
import { useRouter } from "next/router";
import { useGetChatsByUserId } from "../hooks";
import { useEffect } from "react";
import { useChatContext } from "../context/ChatContext";
import LoadingScreen from "../components/molecules/LoadingScreen";
import MainLayout from "../layout/MainLayout";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const {  
    setFirstnameInitial, 
    setLastnameInitial, 
    setProfile, 
    setFirstname, 
    setLastname, } = useChatContext();
  const { data: fetchedChats, isLoading } = useGetChatsByUserId(user?.uid as string);

  useEffect(() => {
    if (!isLoading && fetchedChats) {
      const defaultChat = fetchedChats[0];
      const defaultChatId = fetchedChats[0].id;
      router.replace(`/chat/${defaultChatId}`);

      const recipient = defaultChat.participants.find(p => p.accountId !== user?.uid);
      const profileBg = recipient?.profileBgColor;
      const profilePicture = recipient?.profilePicture;
      const profile = !profilePicture ? profileBg : ''

      if (recipient) {
        setProfile(profile || '');
        setFirstname(recipient.firstname);
        setLastname(recipient.lastname);
        setFirstnameInitial(recipient.firstname[0].charAt(0));
        setLastnameInitial(recipient.lastname[0].charAt(0));
      }
    }
  }, [isLoading, fetchedChats, router, setFirstnameInitial, 
    setLastnameInitial, setProfile, setFirstname, setLastname, user?.uid])

  return (
    <MainLayout>
      <div className="max-w-screen-xl mx-auto">
        <LoadingScreen />
      </div>
    </MainLayout>
  )
}   