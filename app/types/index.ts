import { ReactNode } from 'react';

export enum STATES {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export type TOnRecordSave = () => Promise<void>;

export interface IAppModal {
  isOpenType: TIsOpenTypeModal;
  onClosedModal: () => void;
  modalHeader: JSX.Element;
  children: ReactNode;
}

export type TIsOpenTypeModal = 'addTask' | 'editTask' | 'closed';
