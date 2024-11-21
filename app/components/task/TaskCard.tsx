import { sliceTitle } from '@/utils/string';
import PencilIcon from '../icons/Pencil';
import TrashIcon from '../icons/Trash';
import { ITask, STATES } from '@/app/types';
import { useContext } from 'react';
import { AppContext } from '@/app/context/AppContext';
import { buttonStateMap, nextSTasktate } from '@/utils/functions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IChangeState, changeTaskState } from '@/utils/mutations';
import Loading from '../Loading';

const buttonNextState = (state: STATES): string => buttonStateMap[state];

const TaskCard = ({ task }: { task: ITask }) => {
  const { id, name, stateName } = task;
  const {
    updateAppModal,
    updateModalData,
    toast: { setToast },
  } = useContext(AppContext);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ taskId, nextState }: IChangeState) =>
      changeTaskState({ taskId, nextState }),
    onSuccess: (data) => {
      setToast({ idVisible: true, message: data.message });

      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: Error) => {
      console.error('Error changing task state:', error.message);
      setToast({ idVisible: true, message: error.message });
    },
  });

  const btnText = buttonNextState(stateName);

  const handleEditTask = () => {
    updateModalData({ ...task });
    updateAppModal('editTask');
  };

  const handleDeleteTask = () => {
    updateModalData({ id });
    updateAppModal('removeTask');
  };

  const handleClick = () => {
    const nextState = nextSTasktate(task.stateName);
    mutate({ taskId: task.id, nextState });
  };

  return (
    <div className='flex justify-between items-center gap-x-4 m-6 p-2 pb-4 bg-white rounded shadow-md cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl '>
      <h5 className='font-semibold' title={name}>
        {sliceTitle(name, 30)}
      </h5>
      <div className='flex items-center gap-1 justify-center'>
        <button
          className='text-sm  bg-violet-400  text-white rounded p-1 px-2 hover:bg-violet-600'
          title={btnText}
          onClick={handleClick}
          disabled={isPending}
        >
          {isPending ? <Loading className='border-white w-4 h-4' /> : btnText}
        </button>
        {stateName !== STATES.DONE && (
          <button
            className='p-1 bg-black text-white rounded transition-all duration-300 ease-in-out'
            onClick={handleEditTask}
          >
            <PencilIcon />
          </button>
        )}
        <button
          className='p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-300 ease-in-out'
          onClick={handleDeleteTask}
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};
export default TaskCard;
