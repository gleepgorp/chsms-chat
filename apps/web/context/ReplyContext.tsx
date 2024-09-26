import { ReactNode, useContext, createContext, useState, Dispatch, SetStateAction } from 'react';

type ReplyProviderType = {
  children: ReactNode;
}

type ReplyContextType = {
  recipient: string;
  recipientId: string;
  messageReplied: string;
  replyChatId: string;
  messageId: string;
  setRecipient: Dispatch<SetStateAction<string>>;
  setMessageId: Dispatch<SetStateAction<string>>;
  setReplyChatId: Dispatch<SetStateAction<string>>;
  setRecipientId: Dispatch<SetStateAction<string>>;
  setMessageReplied: Dispatch<SetStateAction<string>>;
  isSent: boolean;
  setIsSent: Dispatch<SetStateAction<boolean>>;
}

export const ReplyContext = createContext<ReplyContextType | null>(null);

export function useReplyContext(): ReplyContextType {
  const context = useContext(ReplyContext);
  if (!context) {
    throw new Error('useReplyContext must be used within a ReplyProvider');
  }
  return context;
}

export default function ReplyProvider(props: ReplyProviderType): JSX.Element {
  const { children } = props;
  const [recipient, setRecipient] = useState<string>('');
  const [recipientId, setRecipientId] = useState<string>('');
  const [messageReplied, setMessageReplied] = useState<string>('');
  const [replyChatId, setReplyChatId] = useState<string>('');
  const [messageId, setMessageId] = useState<string>('');
  const [isSent, setIsSent] = useState<boolean>(false)

  return (
    <ReplyContext.Provider
      value={{ 
        recipient, 
        recipientId,
        messageReplied, 
        replyChatId,
        messageId,
        setRecipient, 
        setMessageId,
        setReplyChatId,
        setRecipientId,
        setMessageReplied,
        isSent,
        setIsSent, 
      }}
    >
      {children}
    </ReplyContext.Provider>
  )
}