import { ReactNode } from 'react';

export interface ITask {
  id: number;
  name: string;
  stateId: number;
  stateName: STATES;
}

export enum STATES {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export type TOnRecordSave = () => Promise<void>;

export interface IAppModal {
  isOpenType: TIsOpenTypeModal;
  onClosedModal: () => void;
  modalHeader: JSX.Element;
  children: ReactNode;
}

export type TIsOpenTypeModal = 'addTask' | 'editTask' | 'closed';
