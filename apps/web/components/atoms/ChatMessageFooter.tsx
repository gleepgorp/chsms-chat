import React from 'react'
import { IoSend } from "react-icons/io5";
import Button from './Button';
import { Field, Form, Formik } from 'formik';
import TextInputFormik from './TextInputFormik';

export default function ChatMessageFooter() {
  
  function onSubmit(data: any) {
    console.log(data);
  }

  const initialValues = {
    message: '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={''}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className='flex flex-row gap-3 p-2'>
          <div className='flex-1'>
            <Field 
              label="message"
              id='message'
              name='message'
              type='text'
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

