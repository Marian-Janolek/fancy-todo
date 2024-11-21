import { createContext, ReactNode, useState } from 'react';
import { ITask, TIsOpenTypeModal } from '../types';
import { defaultModalState } from '../../utils/constants';
import { defaultToast } from '@/utils/constants';

interface IToast {
  idVisible: boolean;
  message: JSX.Element | string;
}

interface IAppContext {
  appModal: TIsOpenTypeModal;
  updateAppModal: (state: TIsOpenTypeModal) => void;
  modalData: Partial<ITask>;
  updateModalData: (data: Partial<ITask>) => void;
  toast: {
    toastDetails: IToast;
    setToast: (toast: IToast) => void;
    closeToast: () => void;
  };
}

export const AppContext = createContext({} as IAppContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [appModal, setAppModal] = useState<TIsOpenTypeModal>(defaultModalState);
  const [modalData, setModalData] = useState<Partial<ITask>>({});
  const [toastDetails, setToastDetails] = useState<IToast>(defaultToast);

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
