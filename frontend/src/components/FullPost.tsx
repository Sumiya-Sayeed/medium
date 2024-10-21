import Appbar from '../components/Appbar';
import { PostProps } from '../hooks';
import Avatar from '../components/Avatar';

const FullPost = ({ post }: { post: PostProps }) => {
  return (
    <div className='flex justify-center flex-col'>
      <Appbar />
      <div className='grid grid-cols-12 w-full px-10 pt-20 max-w-screen-xl'>
        <div className='col-span-8'>
          <div className='text-5xl font-extrabold my-3'>{post.title}</div>
          <div className='font-extrabold text-slate-500 my-3'>
            Posted on October 21, 2024
          </div>
          <div>{post.content}</div>
        </div>
        <div className='col-span-4 '>
          <div className='text-slate-600 text-lg'>Author</div>
          <div className='flex w-full'>
            <div className='pr-4 flex justify-center w-[25%]'>
              <Avatar size='big' authorName={post.author.name || 'Anonymous'} />
            </div>
            <div className='w-[75%]'>
              <div className='text-xl font-bold text-black'>
                {post.author.name || 'Anonymous'}
              </div>
              <div className='pt-2 text-slate-500'>
                Random catches p-hrases about the author's ability
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPost;
