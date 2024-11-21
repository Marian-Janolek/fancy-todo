import { AppContext } from '@/app/context/AppContext';
import { useEffect, useContext } from 'react';

const duration = 3000;

const Toast = () => {
  const { toast } = useContext(AppContext);
  const { closeToast, setToast, toastDetails } = toast;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setToast({ idVisible: false, message: '' });
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, toastDetails]);

  if (!toastDetails.idVisible) return null;

  return (
    <div
      onClick={closeToast}
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 bg-white text-black border-2 border-primary px-4 py-2 rounded shadow-lg transition-all duration-500 cursor-pointer z-[100] ${
        toastDetails.idVisible ? 'opacity-100' : 'translate-x-full opacity-0'
      }`}
      dangerouslySetInnerHTML={{ __html: toastDetails.message }}
    ></div>
  );
};

export default Toast;
