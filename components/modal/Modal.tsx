import { AppContext } from '@/context/AppContext';
import { IAppModal } from '@/types';
import { useContext, useRef } from 'react';
import ModalHeader from './ModalHeader';
import { useClickOutside } from '@/hooks/useClickOutside';

const Modal = ({
  children,
  modalHeader,
  onClosedModal,
  isOpenType,
}: IAppModal) => {
  const { appModal, updateAppModal } = useContext(AppContext);
  const modalRef = useRef(null);

  useClickOutside(modalRef, () => updateAppModal('closed'));

  return (
    appModal === isOpenType && (
      <div className='cursor-pointer fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div
          ref={modalRef}
          className='cursor-auto bg-white rounded-md shadow-lg w-11/12 max-w-md p-6 relative'
        >
          <div className='flex justify-between items-center pb-4'>
            <ModalHeader title={modalHeader} />
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
