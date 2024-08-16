import React, { useEffect, useState } from 'react'
import { IoSend } from "react-icons/io5";
import Button from './Button';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import TextInputFormik from './TextInputFormik';
import { useCreateMessage } from '../../hooks/useMutation';
import { useQueryClient } from '@tanstack/react-query';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { MessageDTO } from 'apps/api/src/app/message/dto/message.dto';
import { useAuth } from '../../context';
import { useChatContext } from '../../context/ChatContext';
import { useRouter } from 'next/router';
import { useNewChatContext } from '../../context/NewChatContext';
import { messageSchema } from '../../schema/message-schema';
import { useGetChatsByUserId } from '../../hooks';
import ReplyChatLayout from '../molecules/ReplyChatLayout';
import { useReplyContext } from '../../context/ReplyContext';

type ChatMessageFooterProps = {
  chatId: string;
}

export default function ChatMessageFooter(props: ChatMessageFooterProps): JSX.Element {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { recipientId, setFetchingOldMssgs } = useChatContext();
  const { 
    messageId: replyId,
    replyChatId, 
    setRecipient, 
    setMessageReplied, 
    setRecipientId,
    setMessageId,
  } = useReplyContext();

  const router = useRouter();
  const { id } = router.query;

  const newChatRoute = router.pathname.includes('/new');
  
  const { data: fetchedChats } = useGetChatsByUserId(user?.uid as string);
  const { recipientId: NewChatRecipient } = useNewChatContext();
  const { mutate: createMessage } = useCreateMessage({
    onSuccess: createMessage => {
      queryClient.setQueryData(['GET_MSSG_BY_CHATID', createMessage.id], createMessage)
    },
  });
  
  function onSubmit(data: MessageDTO, { resetForm }: FormikHelpers<MessageDTO>) {
    createMessage({ messageData: data, replyId });
    resetForm();
    setFetchingOldMssgs(false);

    if (newChatRoute && fetchedChats) {
      setTimeout(() => {
        router.replace(`/`);
      }, 1000)  
    }
  }

  useEffect(() => {
    if (!replyChatId) {
      setRecipient(''); 
      setMessageReplied('');
      setRecipientId('');
      setMessageId('');
    }
  }, [id, replyChatId, setRecipient, setMessageReplied, setRecipientId, setMessageId]);

  const initialValues = {
    content: '',
    read: false,
    senderId: user?.uid,
    recipientId: [newChatRoute ? NewChatRecipient : recipientId],
  }

  return (
    <div className='mt-2'>
      <ReplyChatLayout />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={messageSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className='flex flex-row gap-4 p-2'>
            <div className='flex-1'>
              <Field 
                label="message"
                id='content'
                name='content'
                type='text'
                autoComplete='off'
                variant='standard'
                autoFocus={id && true}
                component={TextInputFormik}
                placeholder='Send a message'
              />
            </div>
            <Button type='submit' variant='svg' size='svg'>
              <IoSend className='text-xl'/>
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

