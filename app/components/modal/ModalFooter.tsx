import { TOnRecordSave } from '@/app/types';

interface IModalFooter {
  disabled?: boolean;
  onRecordSave: TOnRecordSave;
}

const ModalFooter = ({ onRecordSave, disabled }: IModalFooter) => {
  return (
    <div className='mt-6 flex justify-end gap-2'>
      <button
        onClick={onRecordSave}
        disabled={disabled}
        className='px-2 py-1 bg-violet-400 text-white rounded hover:bg-violet-600 transition'
      >
        Potvrdiť
      </button>
      <button
        onClick={() => console.log('TODO close modal')}
        className='px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition'
      >
        Zrušiť
      </button>
    </div>
  );
};
export default ModalFooter;
