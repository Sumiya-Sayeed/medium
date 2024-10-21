import React from 'react';
import Quote from '../components/Quote';
import Auth from '../components/Auth';

export const Signin = () => {
  return (
    <div className='grid grid-cols-1 m-4 md:m-0 md:grid-cols-2'>
      <Auth type='signin' />
      <div className='hidden md:block'>
        <Quote />
      </div>
    </div>
  );
};

export default Signin;
