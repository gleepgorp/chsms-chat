import React, { useState } from 'react';
import { useRouter } from 'next/router';
import TextInput from '../atoms/TextInput';
import Button from '../atoms/Button';
import PasswordEyeIcon from '../atoms/PasswordEyeIcon';
import { Routes } from '../../constants/routes';
import { Formik, Form, Field } from 'formik';
import { loginSchema, signUpSchema } from '../../schema/auth-schema';
import LoadingSpinner from '../atoms/LoadingSpinner';

type AuthContainerPropsType = {
  handleFormSubmit?: (email: string, password: string, firstname: string, lastname: string) => Promise<void>;
}

export default function AuthContainer(props: AuthContainerPropsType) {
  const router = useRouter();
  const { handleFormSubmit } = props;

  const [isLoading, setIsLoading] = useState<boolean>();
  const [showPass, setShowPass] = useState(false);
  const loginPath = router.pathname.includes('/login');
  const signUpPath = router.pathname.includes('/sign-up');
  
  const toggleShowPass = () => {
    setShowPass(prev => !prev);
  };

  const initialValues = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
  };

  async function onSubmit(data: any): Promise<void> {
    setIsLoading(true);
    const { email, password, firstname, lastname } = data;
    try {
      if (handleFormSubmit) {
        await handleFormSubmit(email, password, firstname, lastname);
      } else {
        console.error('handleFormSubmit is not defined');
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginPath ? loginSchema : signUpSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className='flex flex-col gap-2 w-72' >
          <div className='flex flex-col gap-2'>
            {signUpPath && 
              <>
                <Field
                  component={TextInput} 
                  name='firstname'
                  id='firstname' 
                  label='firstname' 
                  placeholder='firstname' 
                  disabled={isSubmitting ? true : false}
                />
                <Field
                  component={TextInput} 
                  name='lastname'
                  id='lastname' 
                  label='lastname' 
                  placeholder='lastname' 
                  disabled={isSubmitting ? true : false}
                />
              </>
            }
            <Field
              name='email'
              component={TextInput}
              id='email' 
              label='email' 
              placeholder='email' 
              disabled={isSubmitting ? true : false}
            />
            <Field
              name='password'
              component={TextInput}
              id='password' 
              label='password' 
              placeholder='password' 
              type={showPass ? 'text' : 'password'} 
              disabled={isSubmitting ? true : false}
              endadornment={
                <PasswordEyeIcon 
                  isVisible={showPass}  
                  onToggle={toggleShowPass} 
                />
              }
            />
            {signUpPath && 
              <Field
                component={TextInput} 
                name='confirmPassword'
                id='confirmPassword' 
                label='confirm password' 
                placeholder='confirm password' 
                disabled={isSubmitting ? true : false}
                type={showPass ? 'text' : 'password'}
              />
            }
            <div className='flex flex-row items-center gap-2 justify-end mb-2'>
              {loginPath && 
                <>
                  <Field type='checkbox' name='rememberMe' className='accent-stone-400 cursor-pointer'/>      
                  <span className='text-stone-400 text-xs'>Remember me</span>
                </>
              }
            </div>
          </div>
          <Button 
            type='submit' 
            variant='primary' 
            disabled={isSubmitting ? true : false}
          >
            {isSubmitting ? <LoadingSpinner /> : loginPath ? 'Login' : 'Confirm'}
          </Button>
          <div className='flex flex-col gap-4'>
            <div className={`flex flex-row ${signUpPath ? 'justify-end' : 'justify-between'}`}>
              {
                loginPath && 
                <>
                  <Button href={Routes.FORGOT_PASSWORD} variant='link' size='sm'>Forgot password?</Button>
                  <Button href={Routes.SIGN_UP} variant='link' size='sm'>Sign Up?</Button>
                </>
              }
              {
                signUpPath && 
                <Button href={Routes.LOGIN} variant='link' size='sm'>Back to Login?</Button>
              }
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

