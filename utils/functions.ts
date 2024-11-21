import { STATES } from '@/app/types';

interface ITask {
  id: number;
  name: string;
  state: {
    id: number;
    stateName: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  };
}

export const buttonStateMap: Record<STATES, string> = {
  [STATES.TODO]: 'Štart',
  [STATES.IN_PROGRESS]: 'Hotovo',
  [STATES.DONE]: 'Odznova',
};

export const nextSTasktate = (state: STATES): STATES => {
  const stateFlow: Record<STATES, STATES> = {
    [STATES.TODO]: STATES.IN_PROGRESS,
    [STATES.IN_PROGRESS]: STATES.DONE,
    [STATES.DONE]: STATES.TODO,
  };

  const next = stateFlow[state];
  if (!next) {
    throw new Error(`Invalid state: ${state}`);
  }

  return next;
};

export const mapTasks = (tasks: ITask[]) => {
  return tasks.map((task) => ({
    id: task.id,
    name: task.name,
    stateName: task.state.stateName as STATES,
  }));
};
