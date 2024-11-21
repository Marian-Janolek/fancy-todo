const Loading = ({ className }: { className?: string }) => {
  return (
    <div className='flex items-center justify-center'>
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-violet-600 ${
          className ? className : 'w-6 h-6'
        }`}
      ></div>
    </div>
  );
};
export default Loading;
