import { useContext } from 'react';
import Modal from './Modal';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import { AppContext } from '@/app/context/AppContext';

const DeleteTaskModal = () => {
  const {
    updateAppModal,
    modalData,
    updateModalData,
    toast: { setToast },
  } = useContext(AppContext);

  const handleSubmit = async () => {
    try {
      if (!modalData.id) {
        return;
      }
      const response = await fetch(`/api/task/${modalData.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      setToast({
        idVisible: true,
        message: data.message,
      });

      if (!response.ok) {
        return;
      }

      updateModalData({});
      updateAppModal('closed');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
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
      <ModalFooter disabled={false} onRecordSave={handleSubmit} />
    </Modal>
  );
};
export default DeleteTaskModal;
