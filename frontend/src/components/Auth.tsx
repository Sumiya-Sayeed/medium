import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LabelledInput from './LabelledInput';
import { SignUpInput } from '@sumiya_sayeed/medium-common-1';
import { BACKEND_URL } from '../config';
import axios, { AxiosError } from 'axios';

const Auth = ({ type = 'signup' }: { type: 'signup' | 'signin' }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignUpInput>({
    name: '',
    email: '',
    password: '',
  });

  const sendRequest = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === 'signup' ? 'signup' : 'signin'}`,
        postInputs,
      );

      const jwt = response.data.jwt;

      localStorage.setItem('token', jwt);
      navigate('/posts');
    } catch (error: AxiosError) {
      console.log(error?.response?.message);
      alert(`Couldn't sign up. Please try again, ${error?.response?.message}`);
      console.log('error', error);
      throw error;
    }
  };

  return (
    <div className='h-screen bg-white flex gap-5 justify-center flex-col w-[100%] lg:p-40 md:p-20'>
      <div className='text-3xl font-extrabold text-center mt-8'>
        Create an account
      </div>
      <div className='text-slate-400 text-center'>
        {type === 'signin'
          ? "Don't have an account"
          : 'Already have an account?'}
        <Link
          className='pl-2 hover:text-slate-700 hover:underline'
          to={type === 'signin' ? '/signup' : '/signin'}
        >
          {type === 'signin' ? 'Sign up' : 'Sign in'}
        </Link>
      </div>
      {type === 'signup' && (
        <LabelledInput
          label='Name'
          placeholder='Enter your name'
          onChange={(e) =>
            setPostInputs((p) => ({ ...p, name: e.target.value }))
          }
        />
      )}
      <LabelledInput
        label='Email'
        placeholder='Enter your email'
        onChange={(e) =>
          setPostInputs((p) => ({ ...p, email: e.target.value }))
        }
      />
      <LabelledInput
        label='Password'
        type='password'
        placeholder='Enter your password'
        onChange={(e) =>
          setPostInputs((p) => ({ ...p, password: e.target.value }))
        }
      />
      <button
        onClick={sendRequest}
        type='button'
        className='text-white mt-8 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
      >
        {type === 'signup' ? 'Sign Up' : 'Sign In'}
      </button>
    </div>
  );
};

export default Auth;
