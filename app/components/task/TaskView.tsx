import { FORM_MODE } from '@/app/types';
import Pagination from '../pagination/Pagination';
import TaskWrapper from './TaskWrapper';
import dynamic from 'next/dynamic';

const DynamicTaskModal = dynamic(() => import('../modal/TaskModal'), {
  ssr: false,
});
const DynamicDeleteTaskModal = dynamic(
  () => import('../modal/DeleteTaskModal'),
  {
    ssr: false,
  }
);

const TaskView = () => {
  return (
    <>
      <div className='mt-6 p-6 w-full rounded bg-white '>
        <TaskWrapper />
        <div className='flex justify-between mt-4'>
          <div />
          <Pagination />
        </div>
      </div>
      <DynamicTaskModal mode={FORM_MODE.EDIT} />
      <DynamicDeleteTaskModal />
    </>
  );
};
export default TaskView;
