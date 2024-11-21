import { AppContext } from '@/app/context/AppContext';
import { TOnRecordSave } from '@/app/types';
import { defaultModalState } from '@/utils/constants';
import { useContext } from 'react';
import Loading from '../Loading';

interface IModalFooter {
  isLoading?: boolean;
  onRecordSave: TOnRecordSave;
}

const ModalFooter = ({ onRecordSave, isLoading }: IModalFooter) => {
  const { updateAppModal } = useContext(AppContext);
  return (
    <div className='mt-6 flex justify-end gap-2'>
      <button
        onClick={onRecordSave}
        disabled={isLoading}
        className='px-2 py-1 bg-secondary text-white rounded hover:bg-primary transition'
      >
        {isLoading ? <Loading className='w-4 h-4 border-white' /> : 'Potvrdiť'}
      </button>
      <button
        onClick={() => updateAppModal(defaultModalState)}
        className='px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition'
      >
        Zrušiť
      </button>
    </div>
  );
};
export default ModalFooter;
