import { use } from 'react';
import TaskColumn from './TaskColumn';
import { STATES } from '@/app/types';

const fetchTaskData = async () => {
  const res = await fetch('/api/tasks/');
  const data = await res.json();

  return data.data;
};

const taskPromise = fetchTaskData();

const TaskWrapper = () => {
  const tasks = use(taskPromise);

  return (
    <div className='grid grid-cols-1 gap-x-4 text-center md:grid-cols-2 xl:grid-cols-3'>
      <TaskColumn title='To do' key='to-do' data={tasks[STATES.TODO]} />
      <TaskColumn
        title='In progress'
        key='in-progress'
        data={tasks[STATES.IN_PROGRESS]}
      />
      <TaskColumn title='Done' key='done' data={tasks[STATES.DONE]} />
    </div>
  );
};
export default TaskWrapper;
