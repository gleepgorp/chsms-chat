import { ReactNode, useContext, createContext, useState } from 'react';

type ReplyProviderType = {
  children: ReactNode;
}

type ReplyContextType = {
  recipient: string;
  recipientId: string;
  messageReplied: string;
  replyChatId: string;
  messageId: string;
  setRecipient: React.Dispatch<React.SetStateAction<string>>;
  setMessageId: React.Dispatch<React.SetStateAction<string>>;
  setReplyChatId: React.Dispatch<React.SetStateAction<string>>;
  setRecipientId: React.Dispatch<React.SetStateAction<string>>;
  setMessageReplied: React.Dispatch<React.SetStateAction<string>>;
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
        setMessageReplied 
      }}
    >
      {children}
    </ReplyContext.Provider>
  )
}