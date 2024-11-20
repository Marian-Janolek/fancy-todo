import { useContext, useRef } from 'react';
import Modal from './Modal';
import ModalHeader from './ModalHeader';
import { AppContext } from '@/app/context/AppContext';
import InputField from '../form/InputField';
import ModalFooter from './ModalFooter';
import { FORM_MODE } from '@/app/types';

const TaskModal = ({ mode }: { mode: FORM_MODE }) => {
  const {
    updateAppModal,
    modalData,
    updateModalData,
    toast: { setToast },
  } = useContext(AppContext);
  const taskNameRef = useRef<HTMLInputElement>(null);
  const isEditing = mode === FORM_MODE.EDIT;

  const handleSubmit = async () => {
    try {
      const taskName = taskNameRef.current?.value.trim();

      if (!taskName) {
        return;
      }
      const body = isEditing
        ? { id: modalData.id, name: taskName }
        : { name: taskName };

      const response = await fetch('/api/task/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      setToast({
        idVisible: true,
        message: data.message,
      });

      if (!response.ok) {
        return;
      }

      if (isEditing) updateModalData({});

      updateAppModal('closed');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <Modal
      modalHeader={<ModalHeader title='Úprava úlohy' />}
      isOpenType={isEditing ? 'editTask' : 'addTask'}
      onClosedModal={() => updateAppModal('closed')}
    >
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <InputField
            ref={taskNameRef}
            name='name'
            type='text'
            maxLength={100}
            placeholder='Názov úlohy (max 100)'
            defaultValue={isEditing ? modalData.name : ''}
          />
        </form>
      </div>
      <ModalFooter disabled={false} onRecordSave={handleSubmit} />
    </Modal>
  );
};
export default TaskModal;
