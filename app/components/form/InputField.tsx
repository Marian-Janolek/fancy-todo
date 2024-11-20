import { RefObject } from 'react';

interface IFormInput {
  name: string;
  type: string;
  defaultValue?: string;
  placeholder?: string;
  maxLength?: number;
  ref?: RefObject<HTMLInputElement>;
}

const InputField = ({
  name,
  type,
  defaultValue,
  placeholder,
  maxLength = 100,
  ref,
}: IFormInput) => {
  return (
    <input
      ref={ref}
      className='w-full p-1 px-4 border-2 border-black rounded focus:outline-none focus:ring-1 focus:ring-violet-600'
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      max={maxLength}
      required
    />
  );
};
export default InputField;
