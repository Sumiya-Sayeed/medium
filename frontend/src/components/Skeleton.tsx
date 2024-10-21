import React from 'react';

const Skeleton = () => {
  return (
    <div role='status' className='max-w-sm animate-pulse'>
      <div className='border-b bolder-slate-200 p-4 w-screen max-w-screen-md cursor-pointer'>
        <div className='flex'>
          <div className='h-2.5 bg-gray-200 rounded-full  w-48 mb-4'></div>
          <div className=' flex  justify-center flex-row'>
            <div className='h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5'></div>{' '}
            <div className='flex justify-center flex-col mx-2'>
              <div className='h-2 bg-gray-200 rounded-full  mb-2.5'></div>
            </div>
            <div className='font-thin text-slate-500 text-sm '>
              <div className='h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5'></div>
            </div>
          </div>
        </div>
        <div className='h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5'></div>{' '}
        <div className='text-md font-thin'>
          <div className='h-2 bg-gray-200 rounded-full  max-w-[360px]'></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
