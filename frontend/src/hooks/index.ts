import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';

export interface PostProps {
  content: string;
  id: string;
  title: string;
  author: {
    name: string;
  };
  publishedAt: string;
}

export const usePost = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<PostProps>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/post/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      })
      .then((res: AxiosResponse) => {
        setPost(res.data.post);
        setLoading(false);
      });

    console.log(post);
  }, [id]);

  return {
    loading,
    post,
  };
};

export const usePosts = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/post/bulk`, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      })
      .then((res: AxiosResponse) => {
        setPosts(res.data.posts);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    posts,
  };
};
