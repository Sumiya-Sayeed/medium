import React, { ChangeEvent } from 'react';

interface ILabelledInput {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password';
}

const LabelledInput = ({
  label,
  placeholder,
  onChange,
  type = 'text',
}: ILabelledInput) => {
  return (
    <div>
      <label className='block mb-2 text-sm font-medium text-gray-900 '>
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        id=''
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default LabelledInput;
