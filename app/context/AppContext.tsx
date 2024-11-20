import { createContext, ReactNode, useState } from 'react';
import { TIsOpenTypeModal } from '../types';
import { defaultModalState } from '../../utils/string';

interface IAppContext {
  appModal: TIsOpenTypeModal;
  updateAppModal: (state: TIsOpenTypeModal) => void;
}

export const AppContext = createContext({} as IAppContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [appModal, setAppModal] = useState<TIsOpenTypeModal>(defaultModalState);

  const updateAppModal = (state: TIsOpenTypeModal) => {
    setAppModal(state);
  };

  return (
    <AppContext.Provider value={{ appModal, updateAppModal }}>
      {children}
    </AppContext.Provider>
  );
};
