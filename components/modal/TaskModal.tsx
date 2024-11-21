import { useContext, useRef, useState } from 'react';
import Modal from './Modal';
import { AppContext } from '@/context/AppContext';
import InputField from '../form/InputField';
import ModalFooter from './ModalFooter';
import { FORM_MODE, ITask, ITaskResponse } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { upsertTask } from '@/utils/mutations';

const errorMessage = 'Názov úlohy musí obsahovať minimálne 1 znak.';

const TaskModal = ({ mode }: { mode: FORM_MODE }) => {
  const {
    updateAppModal,
    modalData,
    updateModalData,
    toast: { setToast },
  } = useContext(AppContext);
  const taskNameRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const [error, setError] = useState(false);
  const isEditing = mode === FORM_MODE.EDIT;

  const { mutate, isPending } = useMutation({
    mutationFn: (body: Partial<ITask>) => upsertTask(body),
    onSuccess: (data: ITaskResponse) => {
      setToast({
        idVisible: true,
        message: data.message,
        type: 'success',
      });

      queryClient.invalidateQueries({ queryKey: ['tasks'] });

      if (isEditing) updateModalData({});

      updateAppModal('closed');
    },
    onError: (error: Error) => {
      console.error('Error saving task:', error.message);
      setToast({
        idVisible: true,
        message: error.message || 'Something went wrong',
        type: 'error',
      });
    },
  });

  const handleSubmit = () => {
    const taskName = taskNameRef.current?.value.trim();

    if (!taskName) {
      setError(true);
      return;
    }

    const body = isEditing
      ? { id: modalData.id, name: taskName }
      : { name: taskName };

    mutate(body);
  };

  const handleInputChange = () => {
    if (error) {
      setError(false);
    }
  };

  return (
    <Modal
      modalHeader={isEditing ? 'Úprava úlohy' : 'Pridanie úlohy'}
      isOpenType={isEditing ? 'editTask' : 'addTask'}
      onClosedModal={() => updateAppModal('closed')}
    >
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          {error && <p className='text-red-500'>{errorMessage}</p>}
          <InputField
            ref={taskNameRef}
            name='name'
            type='text'
            maxLength={100}
            placeholder='Názov úlohy (max 100)'
            defaultValue={isEditing ? modalData.name : ''}
            onChange={handleInputChange}
          />
        </form>
      </div>
      <ModalFooter isLoading={isPending} onRecordSave={handleSubmit} />
    </Modal>
  );
};
export default TaskModal;
