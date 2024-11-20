import { AppContext } from '@/app/context/AppContext';
import { IAppModal } from '@/app/types';
import { defaultModalState } from '@/app/utils/string';
import { useContext } from 'react';

const Modal = ({
  children,
  modalHeader,
  onClosedModal,
  isOpenType,
}: IAppModal) => {
  const { appModal } = useContext(AppContext);

  return (
    appModal === isOpenType && (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='bg-white rounded-md shadow-lg w-11/12 max-w-md p-6 relative'>
          <div className='flex justify-between items-center pb-4'>
            {modalHeader}
            <button
              onClick={onClosedModal}
              className='text-gray-500 hover:text-black font-bold transition'
            >
              ✕
            </button>
          </div>
          {children}
        </div>
      </div>
    )
  );
};
export default Modal;
