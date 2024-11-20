import { sliceTitle } from '@/utils/string';
import PencilIcon from '../icons/Pencil';
import TrashIcon from '../icons/Trash';
import { ITask, STATES } from '@/app/types';
import { useContext } from 'react';
import { AppContext } from '@/app/context/AppContext';

const buttonStateMap: Record<STATES, string> = {
  [STATES.TODO]: 'Štart',
  [STATES.IN_PROGRESS]: 'Hotovo',
  [STATES.DONE]: 'Odznova',
};

const buttonNextState = (state: STATES): string => buttonStateMap[state];

const TaskCard = ({ task }: { task: ITask }) => {
  const { id, name, stateId, stateName } = task;
  const { updateAppModal } = useContext(AppContext);
  const btnText = buttonNextState(stateName);

  return (
    <div className='flex justify-between items-center gap-x-4 m-6 p-2 pb-4 bg-white rounded shadow-md cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl '>
      <h5 className='font-semibold' title={name}>
        {sliceTitle(name, 40)}
      </h5>
      <div className='flex items-center gap-1 justify-center'>
        <button
          className='text-sm  bg-violet-400  text-white rounded p-1 px-2 hover:bg-violet-600'
          title={btnText}
        >
          {btnText}
        </button>
        {stateName !== STATES.DONE && (
          <button
            className='p-1 bg-black text-white rounded transition-all duration-300 ease-in-out'
            onClick={() => updateAppModal('editTask')}
          >
            <PencilIcon />
          </button>
        )}
        <button className='p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-300 ease-in-out'>
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};
export default TaskCard;
