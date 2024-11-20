import { ITask } from '../../types';
import TaskCard from './TaskCard';

interface ITaskColumn {
  title: string;
  data?: ITask[];
}

const TaskColumn = ({ title, data }: ITaskColumn) => {
  return (
    <div className='bg-background min-h-20'>
      <h5
        className='text-center bg-violet-600 text-white py-1 font-medium sticky top-20'
        title={title}
      >
        {title}
      </h5>
      {data?.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};
export default TaskColumn;
