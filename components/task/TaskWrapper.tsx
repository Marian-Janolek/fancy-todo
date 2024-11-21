import TaskColumn from './TaskColumn';
import { STATES } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { getTasks } from '@/utils/mutations';
import { useContext, useEffect } from 'react';
import { AppContext } from '@/context/AppContext';
import { useSearchParams } from 'next/navigation';

const TaskWrapper = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page'));
  const {
    pagination: { setCurrentPage },
  } = useContext(AppContext);

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks', page],
    queryFn: () => getTasks(page),
  });

  useEffect(() => {
    if (tasks) {
      return setCurrentPage({ totalPages: tasks?.data.totalPages });
    }
  }, [tasks]);

  return (
    <div className='grid grid-cols-1 gap-x-4 text-center md:grid-cols-2 xl:grid-cols-3'>
      <TaskColumn
        title='To do'
        key='to-do'
        data={tasks?.data[STATES.TODO]}
        isLoading={isLoading}
        id={STATES.TODO}
      />
      <TaskColumn
        title='In progress'
        key='in-progress'
        data={tasks?.data[STATES.IN_PROGRESS]}
        isLoading={isLoading}
        id={STATES.IN_PROGRESS}
      />
      <TaskColumn
        title='Done'
        key='done'
        data={tasks?.data[STATES.DONE]}
        isLoading={isLoading}
        id={STATES.DONE}
      />
    </div>
  );
};
export default TaskWrapper;
