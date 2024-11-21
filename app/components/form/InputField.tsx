import { RefObject } from 'react';

interface IFormInput {
  name: string;
  type: string;
  defaultValue?: string;
  placeholder?: string;
  maxLength?: number;
  ref?: RefObject<HTMLInputElement>;
  onChange: () => void;
}

const InputField = ({
  name,
  type,
  defaultValue,
  placeholder,
  maxLength = 100,
  ref,
  onChange,
}: IFormInput) => {
  return (
    <input
      ref={ref}
      className='w-full p-1 px-4 border-2 border-black rounded focus:outline-none focus:ring-1 focus:ring-primary'
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      max={maxLength}
      onChange={onChange}
      required
    />
  );
};
export default InputField;
