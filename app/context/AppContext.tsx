import { createContext, ReactNode, useState } from 'react';
import { ITask, TIsOpenTypeModal } from '../types';
import { defaultModalState } from '../../utils/constants';
import { defaultToast } from '@/utils/constants';

interface IAppContext {
  appModal: TIsOpenTypeModal;
  updateAppModal: (state: TIsOpenTypeModal) => void;
  modalData: Partial<ITask>;
  updateModalData: (data: Partial<ITask>) => void;
  toast: {
    toastDetails: { idVisible: boolean; message: string };
    setToast: (toast: { idVisible: boolean; message: string }) => void;
    closeToast: () => void;
  };
}

export const AppContext = createContext({} as IAppContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [appModal, setAppModal] = useState<TIsOpenTypeModal>(defaultModalState);
  const [modalData, setModalData] = useState<Partial<ITask>>({});
  const [toastDetails, setToastDetails] = useState(defaultToast);

  const updateAppModal = (state: TIsOpenTypeModal) => {
    setAppModal(state);
  };

  const updateModalData = (data: Partial<ITask>) => {
    setModalData(data);
  };

  const closeToast = () => {
    setToastDetails({ idVisible: false, message: '' });
  };

  const toast = {
    toastDetails,
    setToast: setToastDetails,
    closeToast,
  };

  return (
    <AppContext.Provider
      value={{
        appModal,
        updateAppModal,
        modalData,
        updateModalData,
        toast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
