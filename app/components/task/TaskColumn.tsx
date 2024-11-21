import { ITask } from '../../types';
import Loading from '../Loading';
import TaskCard from './TaskCard';

interface ITaskColumn {
  title: string;
  data?: ITask[];
  isLoading?: boolean;
}

const TaskColumn = ({ title, data, isLoading }: ITaskColumn) => {
  return (
    <div className='bg-background min-h-20'>
      <h5
        className='text-center bg-primary text-white py-1 font-medium sticky top-20'
        title={title}
      >
        {title}
      </h5>
      {isLoading ? (
        <Loading className='w-28 h-28 m-20' />
      ) : (
        data?.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  );
};
export default TaskColumn;
