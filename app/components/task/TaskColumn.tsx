import { STATES } from '../../types/states';
import TaskCard from './TaskCard';

interface ITaskColumn {
  title: string;
}

const TaskColumn = ({ title }: ITaskColumn) => {
  return (
    <div className='bg-background'>
      <h5
        className='text-center bg-violet-600 text-white py-1 font-medium sticky top-20'
        title={title}
      >
        {title}
      </h5>
      <TaskCard id='a' title='Vysypať smeti' state={STATES.TODO} />
      <TaskCard id='a' title='Vysypať smeti' state={STATES.TODO} />
      <TaskCard id='a' title='Vysypať smeti' state={STATES.TODO} />
      <TaskCard id='a' title='Vysypať smeti' state={STATES.IN_PROGRESS} />
      <TaskCard id='a' title='Vysypať smeti' state={STATES.IN_PROGRESS} />
      <TaskCard id='a' title='Vysypať smeti' state={STATES.IN_PROGRESS} />
      <TaskCard id='a' title='Vysypať smeti' state={STATES.COMPLETED} />
      <TaskCard id='a' title='Vysypať smeti' state={STATES.COMPLETED} />
      <TaskCard id='a' title='Vysypať smeti' state={STATES.COMPLETED} />
    </div>
  );
};
export default TaskColumn;
