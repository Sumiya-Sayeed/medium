import axios from 'axios';
import { useEffect, useState } from 'react';
import Appbar from '../components/Appbar';
import 'react-quill/dist/quill.snow.css';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

const Publish = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div>
      <Appbar />
      <div className='flex flex-col items-center w-full mt-5'>
        <div className='max-w-screen-lg w-full mt-2 p-7'>
          <label className='block mb-2 text-sm font-medium text-gray-900 '>
            Title
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type='text'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='Title'
          />
        </div>
        <div className='max-w-screen-lg w-full mb-1 p-7'>
          <textarea
            id='value'
            rows={4}
            onChange={(e) => setValue(e.target.value)}
            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            placeholder='Write your thoughts here...'
          ></textarea>
        </div>
        <button
          onClick={async () => {
            const response = await axios.post(
              `${BACKEND_URL}/api/v1/post/create`,
              {
                title,
                content: value,
                authorId: 'b959170f-4aa5-40e7-bbf0-cc99793cf769',
              },
              {
                headers: {
                  Authorization: `${localStorage.getItem('token')}`,
                },
              },
            );
            navigate(`/post/${response.data.id}`);
          }}
          className='bg-green-500 text-white px-5 py-2 rounded-lg'
        >
          Publish Post
        </button>
      </div>
    </div>
  );
};

export default Publish;
