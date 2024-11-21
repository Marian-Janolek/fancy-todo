import { ITask, STATES } from '@/app/types';

export interface IChangeState {
  taskId: number;
  nextState: STATES;
}

export const getTasks = async (page: number, limit = 8) => {
  const res = await fetch(`/api/tasks?page=${page}&limit=${limit}`);

  if (!res.ok) {
    throw new Error('Failed to fetch tasks');
  }

  const data = await res.json();
  return data;
};

export const changeTaskState = async ({ taskId, nextState }: IChangeState) => {
  const response = await fetch(`/api/task/${taskId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nextState }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to change task state');
  }

  return data;
};

export const deleteTask = async (taskId: number) => {
  const response = await fetch(`/api/task/${taskId}`, {
    method: 'DELETE',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete task');
  }

  return data;
};

export const upsertTask = async (body: Partial<ITask>) => {
  const response = await fetch('/api/task/', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to save task');
  }
  return data;
};
