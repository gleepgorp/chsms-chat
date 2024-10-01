import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { IoSend } from "react-icons/io5";
import Button from './Button';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import TextInputFormik from './TextInputFormik';
import { useCreateMessage, useCreateMessageGroupChat } from '../../hooks/useMutation';
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
import UploadFile from './UploadFile';
import FilePreview from './FilePreview';
import { filterFileUpload, storage } from '../../utils';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

type ChatMessageFooterProps = {
  chatId: string;
}

export default function ChatMessageFooter(props: ChatMessageFooterProps): JSX.Element {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const router = useRouter();
  const id = router.query.id as string;
  const loggedUser = user?.uid as string;
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { recipientIds, setFetchingOldMssgs, isGroup, fileList, setFileList } = useChatContext();
  // find current chat files base on url id
  const currentChatFiles = fileList.find(file => file.chatId === id)?.files || [];
  const notEmptyFileList = currentChatFiles.map(item => item.length !== 0);

  const { 
    messageId: replyId,
    replyChatId, 
    setRecipient, 
    setMessageReplied, 
    setRecipientId,
    setMessageId,
    setIsSent
  } = useReplyContext();

  const newChatRoute = router.pathname.includes('/new');
  
  const { data: fetchedChats } = useGetChatsByUserId(user?.uid as string, 20);
  const { recipientId: NewChatRecipient } = useNewChatContext();
  const { mutate: createMessage } = useCreateMessage({
    onSuccess: createMessage => {
      queryClient.setQueryData(['GET_MSSG_BY_CHATID', createMessage.id], createMessage)
    },
  });
  const { mutate: createMessageGC } = useCreateMessageGroupChat({
    onSuccess: createMessageGC => {
      queryClient.setQueryData(['GET_MSSG_FOR_GROUP', createMessageGC.id], createMessageGC)
    },
  });

  // for chat apps uploading file one by one is better than a single blob
  const existingFile = fileList.find(item => item.chatId === id);
  async function uploadImage() {
    if (existingFile) {
      const urls = [];
      for (const file of existingFile.actualFiles) {
        const imageRef = ref(storage, `${id}/${loggedUser}/${file.name + v4()}`);
        try {
          await uploadBytes(imageRef, file);
  
          const downloadURL = await getDownloadURL(imageRef);
          urls.push(downloadURL);
  
        } catch (error) {
          console.error(error);
        }
      }
      return urls;
    }
  }
  
  async function onSubmit(data: MessageDTO, { resetForm }: FormikHelpers<MessageDTO>) {
    let urls = [];
    if (existingFile && existingFile.actualFiles.length > 0) {
      // this will return the urls from the uploadImage
      urls = await uploadImage();
    }
    
    const messageData = {
      ...data,
      files: urls,
    }

    if (isGroup) {
      createMessageGC({ messageData, chatId: id as string, replyId });
    } else {
      createMessage({ messageData, replyId });
    }

    setFileList(prevFiles => prevFiles.map(item => 
      item.chatId === id ? { ...item, files: [], actualFiles: []} : item
    ));
    setFetchingOldMssgs(false);
    setRecipientId('');
    setIsSent(true);
    resetForm();

    if (newChatRoute && fetchedChats) {
      setTimeout(() => {
        router.replace(`/`);
      }, 1000)  
    }
  }

  const handleRemoveFile = (index: number) => {
    
    // must maintain structure of state to ensure no undefined
    setFileList(prevFiles => {
      return prevFiles.map(item => {
        if (item.chatId === id) {
          const newFiles = [...item.files];
          newFiles.splice(index, 1);
          const newActualFiles = [...item.actualFiles];
          newActualFiles.splice(index, 1);
          return { 
            ...item, 
            files: newFiles,
            actualFiles: newActualFiles,
          };
        }
        return item;
      })
    })
  }  

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFileURLs = Array.from(files).map(file => URL.createObjectURL(file));
      const newFiles = Array.from(files).map(file => file);

      // this function allows selected images as draft but only as a state
      setFileList(prevFiles => {
        const existingFileObj = prevFiles.find(item => item.chatId === id);

        if (existingFileObj ) {
          return prevFiles.map(item => 
            item.chatId === id 
            ? { ...item, 
                files: [...item.files, ...newFileURLs ], 
                actualFiles: [...item.actualFiles, ...newFiles],
              }
            : item
          );
        } else {
          return [...prevFiles, { 
            chatId: id as string, 
            files: newFileURLs,  
            actualFiles: newFiles,
          }];
        }
      })
      if (fileInputRef.current) fileInputRef.current.value = "";
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
    recipientId: newChatRoute ? [NewChatRecipient] : recipientIds,
  }

  return (
    <div className='mt-2 w-full'>
      <ReplyChatLayout />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={messageSchema}
        validationContext={{ existingFiles: existingFile?.actualFiles }}
        onSubmit={onSubmit}
      >
        {() => (
          <Form
           className={`flex flex-row gap-4 p-2 "items-center" ${notEmptyFileList && "items-end"} `}
          >
            <UploadFile handleFile={handleFile} fileInputRef={fileInputRef}/>
            <div className={`rounded-full ${notEmptyFileList && "rounded-xl bg-stone-700"} w-full`}>
              <FilePreview handleRemoveFile={handleRemoveFile}/>
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
              <div className='p-2 rounded-full hover:bg-stone-600'>
                <IoSend className='text-xl'/>
              </div>
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

