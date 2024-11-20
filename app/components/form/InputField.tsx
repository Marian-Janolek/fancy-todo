interface IFormInput {
  name: string;
  type: string;
  defaultValue?: string;
  placeholder?: string;
  maxLength?: number;
}

const InputField = ({
  name,
  type,
  defaultValue,
  placeholder,
  maxLength = 100,
}: IFormInput) => {
  return (
    <input
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
