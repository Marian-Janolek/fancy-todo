import { ITask, STATES } from '@/types';
import Loading from '../Loading';
import TaskCard from './TaskCard';
import { DragEvent, useContext, useState } from 'react';
import { canChangeState } from '@/utils/functions';
import { AppContext } from '@/context/AppContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeTaskState, IChangeState } from '@/utils/mutations';

interface ITaskColumn {
  title: string;
  data?: {
    data: ITask[];
    total: number;
  };
  isLoading?: boolean;
  id: string;
}

const TaskColumn = ({ title, data, isLoading, id }: ITaskColumn) => {
  const {
    toast: { setToast },
  } = useContext(AppContext);
  const queryClient = useQueryClient();
  const [indicator, setIndicator] = useState<STATES | null>(null);
  const { mutate } = useMutation({
    mutationFn: ({ taskId, nextState }: IChangeState) =>
      changeTaskState({ taskId, nextState }),
    onSuccess: (data) => {
      setToast({ idVisible: true, message: data.message, type: 'success' });

      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: Error) => {
      console.error('Error changing task state:', error.message);
      setToast({ idVisible: true, message: error.message, type: 'error' });
    },
  });

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIndicator(e.currentTarget.id as STATES);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedElement = e.dataTransfer.getData('text/plain');

    if (!draggedElement.startsWith('{')) {
      e.dataTransfer.clearData();
      setIndicator(null);
      return;
    }

    const task: ITask = JSON.parse(draggedElement);

    if (!canChangeState(task.stateName, indicator as STATES)) {
      setToast({
        idVisible: true,
        message: `Not allowed to change state from <span class='text-violet-600 font-semibold'>${task.stateName}</span> 
        to <span class='text-violet-600 font-semibold'>${indicator}</span> `,
        type: 'error',
      });
      setIndicator(null);
      return;
    }

    mutate({ taskId: task.id, nextState: indicator as STATES });
    setIndicator(null);
  };

  const handleDragLeave = () => {
    setIndicator(null);
  };

  return (
    <div
      className={`bg-background min-h-20 ${
        indicator === id ? 'bg-violet-200' : ''
      } `}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      id={id}
      onDragLeave={handleDragLeave}
    >
      <h5
        className='text-center bg-primary text-white py-1 font-medium sticky top-20'
        title={title}
      >
        {title} ({data?.total || '-'})
      </h5>
      {isLoading ? (
        <Loading className='w-28 h-28 m-20' />
      ) : (
        data?.data.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  );
};
export default TaskColumn;
