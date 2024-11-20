import Pagination from '../pagination/Pagination';
import TaskWrapper from './TaskWrapper';

const TaskView = () => {
  return (
    <div className='mt-6 p-6 w-full rounded bg-white '>
      <TaskWrapper />
      <div className='flex justify-between mt-4'>
        <div />
        <Pagination />
      </div>
    </div>
  );
};
export default TaskView;
