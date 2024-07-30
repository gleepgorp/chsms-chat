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

type ChatMessageFooterProps = {
  chatId: string;
}

export default function ChatMessageFooter(props: ChatMessageFooterProps): JSX.Element {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { chatId } = props;
  const { recipientId } = useChatContext();
  const { isPending, mutate: createMessage } = useCreateMessage({
    onSuccess: createMessage => {
      queryClient.setQueryData(['GET_MSSG_BY_CHATID', createMessage.id], createMessage)
    },
  });
  
  function onSubmit(data: MessageDTO, { resetForm }: FormikHelpers<MessageDTO>)   {
    createMessage({ messageData: data });
    resetForm();
  }

  const values = {
    chatId: chatId,
    content: '',
    senderId: user?.uid,
    recipientId: [recipientId],
  }

  return (
    <Formik
      enableReinitialize
      initialValues={values }
      validationSchema={''}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
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

