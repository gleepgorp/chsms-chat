import React, { useState } from 'react';
import TextInput from '../atoms/TextInput';
import Button from '../atoms/Button';
import PasswordEyeIcon from '../atoms/PasswordEyeIcon';
import { Routes } from 'apps/web/constants/routes';
import { Formik, Form, Field } from 'formik';
import { signUpSchema } from 'apps/web/schema/auth-schema';

export default function SignUpForm() {
  const [showPass, setShowPass] = useState(false);
  
  const toggleShowPass = () => {
    setShowPass(prev => !prev);
  };

  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  };

  const onSubmit = (values: typeof initialValues) => {
    console.log(values)
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signUpSchema}
      onSubmit={onSubmit}
    >
      <Form className='flex flex-col gap-2 w-72'>
        <div className='flex flex-col gap-2'>
          <Field
            component={TextInput} 
            name='firstname'
            id='firstname' 
            label='firstname' 
            placeholder='firstname' 
          />
          <Field
            component={TextInput} 
            name='lastname'
            id='lastname' 
            label='lastname' 
            placeholder='lastname' 
          />
          <Field
            component={TextInput} 
            name='email'
            id='email' 
            label='email' 
            placeholder='email' 
          />
          <Field
            component={TextInput} 
            name='password'
            id='password' 
            label='password' 
            placeholder='password' 
            type={showPass ? 'text' : 'password'} 
            endAdornment={
              <PasswordEyeIcon 
                isVisible={showPass} 
                onToggle={toggleShowPass} 
              />
            }
          />
          <Field
            component={TextInput} 
            name='confirm-password'
            id='confirm-password' 
            label='confirm password' 
            placeholder='confirm password' 
            type={showPass ? 'text' : 'password'}
          />
        </div>
        <Button variant='primary' type='submit'>Confirm</Button>
        <div className='flex flex-row gap-2 justify-end'>
          <Button href={Routes.LOGIN} variant='link' size='sm'>Back to Login?</Button>
        </div>
      </Form>
    </Formik>
  ) 
}

