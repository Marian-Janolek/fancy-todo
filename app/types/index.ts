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

export type TOnRecordSave = () => void;

export interface IAppModal {
  isOpenType: TIsOpenTypeModal;
  onClosedModal: () => void;
  modalHeader: string;
  children: ReactNode;
}

export type TIsOpenTypeModal = 'addTask' | 'editTask' | 'removeTask' | 'closed';

export enum FORM_MODE {
  ADD = 'ADD',
  EDIT = 'EDIT',
}

export interface ITaskResponse {
  message: string;
}
