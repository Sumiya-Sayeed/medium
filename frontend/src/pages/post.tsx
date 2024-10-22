import { useParams } from 'react-router-dom';
import { PostProps, usePost } from '../hooks';
import FullPost from '../components/FullPost';
import Skeleton from '../components/Skeleton';
import Appbar from '../components/Appbar';

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, post } = usePost({ id: id as string });

  if (loading)
    return (
      <div>
        <Appbar />
        <div className='flex justify-center flex-col items-center w-full'>
          <Skeleton />
          <Skeleton />
          Loading...
          <Skeleton />
        </div>
      </div>
    );

  return <FullPost post={post as PostProps} />;
};

export default Post;
