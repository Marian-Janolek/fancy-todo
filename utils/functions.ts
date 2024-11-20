import { STATES } from '@/app/types';

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
