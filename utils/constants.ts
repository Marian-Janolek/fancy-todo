import { IToast } from '@/types';

export const defaultToast: IToast = {
  idVisible: false,
  message: '',
  type: 'success',
};

export const defaultPagination = {
  currentPage: 1,
  totalPages: 1,
};

export const defaultModalState = 'closed';
