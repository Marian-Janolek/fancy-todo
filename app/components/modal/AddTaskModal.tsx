import { useContext } from 'react';
import Modal from './Modal';
import ModalHeader from './ModalHeader';
import { AppContext } from '@/app/context/AppContext';
import InputField from '../form/InputField';
import ModalFooter from './ModalFooter';

const AddTaskModal = () => {
  const { updateAppModal } = useContext(AppContext);
  return (
    <Modal
      modalHeader={<ModalHeader title='Pridanie novej úlohy' />}
      isOpenType='addTask'
      onClosedModal={() => updateAppModal('closed')}
    >
      <div>
        <form action=''>
          <InputField
            name='name'
            type='text'
            maxLength={100}
            placeholder='Názov úlohy (max 100)'
          />
        </form>
      </div>
      <ModalFooter disabled={false} onRecordSave={async () => {}} />
    </Modal>
  );
};
export default AddTaskModal;
