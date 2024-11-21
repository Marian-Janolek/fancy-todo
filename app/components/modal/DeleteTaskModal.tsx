import { useContext } from 'react';
import Modal from './Modal';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import { AppContext } from '@/app/context/AppContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '@/utils/mutations';

const DeleteTaskModal = () => {
  const {
    updateAppModal,
    modalData,
    updateModalData,
    toast: { setToast },
  } = useContext(AppContext);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (taskId: number) => deleteTask(taskId),
    onSuccess: (data) => {
      setToast({
        idVisible: true,
        message: data.message,
      });

      queryClient.invalidateQueries({ queryKey: ['tasks'] });

      updateModalData({});
      updateAppModal('closed');
    },
    onError: (error: Error) => {
      console.error('Error while deleting task:', error.message);
      setToast({
        idVisible: true,
        message: error.message || 'Failed to delete task',
      });
    },
  });

  const handleSubmit = () => {
    if (!modalData.id) {
      return;
    }

    mutate(modalData.id);
  };

  return (
    <Modal
      modalHeader={<ModalHeader title='Vymazanie úlohy' />}
      isOpenType='removeTask'
      onClosedModal={() => updateAppModal('closed')}
    >
      <div>
        <h3>Vymazanie úlohy je nezvratný proces, želáte si pokračovať ?</h3>
      </div>
      <ModalFooter isLoading={isPending} onRecordSave={handleSubmit} />
    </Modal>
  );
};
export default DeleteTaskModal;
