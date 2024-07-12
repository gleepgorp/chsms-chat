import React, { useState } from 'react';
import TextInput from '../atoms/TextInput';
import Button from '../atoms/Button';
import PasswordEyeIcon from '../atoms/PasswordEyeIcon';
import { Routes } from '../../constants/routes';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginSchema } from 'apps/web/schema/auth-schema';

export default function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  
  const toggleShowPass = () => {
    setShowPass(prev => !prev);
  };

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log(values)
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className='flex flex-col gap-2 w-72'>
          <div className='flex flex-col gap-2'>
            <Field
              name='email'
              component={TextInput}
              id='email' 
              label='email' 
              placeholder='email' 
            />
            <Field
              name='password'
              component={TextInput}
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
            <div className='flex flex-row items-center gap-2 justify-end mb-2'>
              <Field type='checkbox' name='rememberMe' className='accent-chsms-orange cursor-pointer'/>
              <span className='text-stone-100 text-xs'>Remember me</span>
            </div>
          </div>
          <Button variant='primary' type='submit'>Login</Button>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-row justify-between'>
              <Button href={Routes.FORGOT_PASSWORD} variant='link' size='sm'>Forgot password?</Button>
              <Button href={Routes.SIGN_UP} variant='link' size='sm'>Sign Up?</Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  ) 
}