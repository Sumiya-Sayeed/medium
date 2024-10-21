import React from 'react';
import Avatar from './Avatar';
import Circle from './Circle';
import { Link } from 'react-router-dom';

interface PostCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedAt: string;
  id: string;
}

const PostCard = ({
  id,
  authorName,
  title,
  content,
  publishedAt,
}: PostCardProps) => {
  return (
    <Link to={`/post/${id}`}>
      <div className='border-b bolder-slate-200 p-4 w-screen max-w-screen-md cursor-pointer'>
        <div className='flex'>
          <Avatar authorName={authorName} />
          <div className=' flex  justify-center flex-row'>
            <div className='font-extralight pl-2 text-sm '>{authorName}</div>
            <div className='flex justify-center flex-col mx-2'>
              <Circle />
            </div>
            <div className='font-thin text-slate-500 text-sm '>
              {publishedAt}
            </div>
          </div>
        </div>

        <div className='text-xl font-bold pt-2'>{title}</div>
        <div className='text-md font-thin'>
          {content.slice(0, 100) + '...'}{' '}
        </div>
        <div className='w-full text-slate-500 text-sm pt-4'>
          {Math.ceil(content.length / 100)} min read
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
