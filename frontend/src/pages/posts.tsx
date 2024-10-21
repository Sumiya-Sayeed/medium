import React from 'react';
import PostCard from '../components/PostCard';
import Appbar from '../components/Appbar';
import { usePosts } from '../hooks';
import Skeleton from '../components/Skeleton';

export const Posts = () => {
  const { posts, loading } = usePosts();

  if (loading)
    return (
      <div>
        <Appbar />
        <div className='flex justify-center flex-col items-center w-full'>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    );

  return (
    <div>
      <Appbar />

      <div className='flex justify-center p-4'>
        <div className=''>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              authorName={post.author.name || 'Anonymous'}
              title={post.title}
              content={post.content}
              publishedAt='October 19, 2024'
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
