import { NextResponse } from 'next/server';
import db from '@/utils/db';
import { ITask, STATES } from '@/app/types';

type GroupedTasks = {
  [key: string]: ITask[];
};

export const GET = async (req: Request) => {
  try {
    const tasks = await db.task.findMany({
      select: {
        id: true,
        name: true,
        state: true,
      },
      where: {
        deletedAt: null,
      },
    });

    if (tasks.length === 0) {
      return NextResponse.json(null, {
        status: 204,
        statusText: 'No content',
      });
    }

    const groupedTasks = tasks.reduce<GroupedTasks>((acc, task) => {
      const stateName = task.state.stateName;

      if (!acc[stateName]) {
        acc[stateName] = [];
      }

      acc[stateName].push({
        id: task.id,
        name: task.name,
        stateId: task.state.id,
        stateName: task.state.stateName as STATES,
      });
      return acc;
    }, {});

    return NextResponse.json(
      { data: groupedTasks },
      {
        status: 200,
        statusText: 'OK',
      }
    );
  } catch (error) {
    console.error('Error while fetching tasks', error);
    return NextResponse.json(
      {
        message: 'An error occurred while fetching tasks',
      },
      {
        status: 500,
        statusText: 'Internal Server Error',
      }
    );
  }
};
