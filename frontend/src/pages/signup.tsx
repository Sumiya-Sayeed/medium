import React from 'react';
import Quote from '../components/Quote';
import Auth from '../components/Auth';

export const Signup = () => {
  return (
    <div className='grid grid-cols-1 m-4 md:m-0 md:grid-cols-2'>
      <Auth type='signup' />
      <div className='hidden md:block'>
        <Quote />
      </div>
    </div>
  );
};

export default Signup;