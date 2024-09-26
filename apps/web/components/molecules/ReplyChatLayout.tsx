import { useAuth } from "../../context";
import { useReplyContext } from "../../context/ReplyContext";
import React from "react"
import { IoClose } from "react-icons/io5";

export default function ReplyChatLayout(): JSX.Element {
  const { user } = useAuth();
  const loggeduser = user?.uid;
  const { 
    recipient, 
    messageReplied, 
    recipientId, 
    messageId,
    setRecipient,
    setMessageReplied,
    setRecipientId,
    setMessageId,
    setIsSent,
    isSent
  } = useReplyContext();

  function handleCloseReply() {
    setRecipient('');
    setMessageReplied('');
    setRecipientId('');
    setMessageId('');
    setIsSent(false);
  }

  return (
    <>
    {recipient && !isSent &&
      <div className="text-stone-100 sticky bottom-0 w-full border-t border-stone-600/60 mt-2">
        <div className="flex flex-row gap-2 items-center justify-between px-3 py-2">
          <div className="flex flex-col">
            <span className="text-[15px]">
              Replying to <span className={recipientId !== loggeduser ? 'capitalize' : ''}>{
                recipientId === loggeduser ? 'yourself'
                : recipient
              }
              </span>
            </span>
            <span className="text-stone-400 text-sm">{messageReplied}</span>
          </div>
          <div 
            onClick={handleCloseReply}
            className="p-2 rounded-full hover:bg-stone-600/70 cursor-pointer"
          >
            <IoClose />
          </div>
        </div>
      </div>
    }
    </>
  )
}