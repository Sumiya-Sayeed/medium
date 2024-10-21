import React from 'react';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';

const Appbar = () => {
  return (
    <div className='border-b flex justify-between px-10 py-4 cursor-pointer'>
      <Link to='/posts'>
        <div className='flex flex-col justify-center'>Medium</div>
      </Link>
      <div>
        <Link to='/publish'>
          <button className='text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mr-3'>
            Write
          </button>
        </Link>

        <Avatar authorName='ss' size={'big'} />
      </div>
    </div>
  );
};

export default Appbar;
