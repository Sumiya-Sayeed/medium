import React from 'react';

const Avatar = ({
  authorName,
  size = 'small',
}: {
  authorName: string;
  size?: 'small' | 'big';
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center w-${
        size === 'small' ? 6 : 10
      } h-${
        size === 'small' ? 6 : 10
      } overflow-hidden bg-gray-100 rounded-full`}
    >
      <span
        className={`font-${
          size === 'small' ? 'text-sm' : 'text-md'
        } text-gray-900 text-md`}
      >
        {authorName[0]}
      </span>
    </div>
  );
};

export default Avatar;
