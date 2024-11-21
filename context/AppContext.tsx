import { createContext, ReactNode, useState } from 'react';
import { ITask, TIsOpenTypeModal } from '../types';
import { defaultModalState, defaultPagination } from '../utils/constants';
import { defaultToast } from '@/utils/constants';
import { useSearchParams } from 'next/navigation';

interface IToast {
  idVisible: boolean;
  message: JSX.Element | string;
}

interface IPagination {
  currentPage: number;
  totalPages: number;
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
  pagination: {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (data: Partial<IPagination>) => void;
  };
}

export const AppContext = createContext({} as IAppContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page'));
  const [appModal, setAppModal] = useState<TIsOpenTypeModal>(defaultModalState);
  const [modalData, setModalData] = useState<Partial<ITask>>({});
  const [toastDetails, setToastDetails] = useState<IToast>(defaultToast);
  const [pagination, setPagination] = useState({
    ...defaultPagination,
    currentPage: page,
  });

  const updateAppModal = (state: TIsOpenTypeModal) => {
    setAppModal(state);
  };

  const updateModalData = (data: Partial<ITask>) => {
    setModalData(data);
  };

  const closeToast = () => {
    setToastDetails({ idVisible: false, message: '' });
  };

  const setCurrentPage = (data: Partial<IPagination>) => {
    setPagination({ ...pagination, ...data });
  };

  const toast = {
    toastDetails,
    setToast: setToastDetails,
    closeToast,
  };

  const paginationDetails = {
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    setCurrentPage,
  };

  return (
    <AppContext.Provider
      value={{
        appModal,
        updateAppModal,
        modalData,
        updateModalData,
        toast,
        pagination: paginationDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
