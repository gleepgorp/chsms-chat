import React, { useState } from 'react'
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

type ChatMessageFooterProps = {
  chatId: string;
}

export default function ChatMessageFooter(props: ChatMessageFooterProps): JSX.Element {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { recipientId } = useChatContext();
  const router = useRouter();
  const newChatRoute = router.pathname.includes('/new');
  const { recipientId: NewChatRecipient } = useNewChatContext();
  const { isPending, mutate: createMessage } = useCreateMessage({
    onSuccess: createMessage => {
      queryClient.setQueryData(['GET_MSSG_BY_CHATID', createMessage.id], createMessage)
    },
  });
  
  function onSubmit(data: MessageDTO, { resetForm }: FormikHelpers<MessageDTO>)   {
    createMessage({ messageData: data });
    resetForm();
  }

  const initialValues = {
    content: '',
    senderId: user?.uid,
    recipientId: [newChatRoute ? NewChatRecipient : recipientId],
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={''}
      onSubmit={onSubmit}
    >
      {() => (
        <Form className='flex flex-row gap-3 p-2'>
          <div className='flex-1'>
            <Field 
              label="message"
              id='content'
              name='content'
              type='text'
              autoComplete='off'
              variant='standard'
              component={TextInputFormik}
              placeholder='Send a message'
            />
          </div>
          <Button type='submit'>
            <IoSend />
          </Button>
        </Form>
      )}
    </Formik>
  )
}

