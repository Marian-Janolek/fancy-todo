import { NextResponse } from 'next/server';
import db from '@/utils/db';
import { STATES } from '@/types';
import { findHighestCount, mapTasks } from '@/utils/functions';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit')) || 10;
  const page = Number(searchParams.get('page')) || 1;

  const skip = (page - 1) * limit;
  try {
    const [todoTasks, inProgressTasks, doneTasks, states] = await Promise.all([
      db.task.findMany({
        select: {
          id: true,
          name: true,
          state: true,
        },
        where: {
          state: {
            stateName: STATES.TODO,
          },
          deletedAt: null,
        },
        take: limit,
        skip,
        orderBy: {
          updatedAt: 'desc',
        },
      }),
      db.task.findMany({
        select: {
          id: true,
          name: true,
          state: true,
        },
        where: {
          state: {
            stateName: STATES.IN_PROGRESS,
          },
          deletedAt: null,
        },
        take: limit,
        skip,
        orderBy: {
          updatedAt: 'desc',
        },
      }),
      db.task.findMany({
        select: {
          id: true,
          name: true,
          state: true,
        },
        where: {
          state: {
            stateName: STATES.DONE,
          },
          deletedAt: null,
        },
        take: limit,
        skip,
        orderBy: {
          updatedAt: 'desc',
        },
      }),
      db.taskState.findMany({
        select: {
          id: true,
          stateName: true,
        },
      }),
    ]);

    const count = await db.task
      .groupBy({
        by: ['stateId'],
        where: { deletedAt: null },
        _count: true,
      })
      .then((counts) => {
        const countMap = new Map(
          counts.map(({ stateId, _count }) => [stateId, _count])
        );
        return states.map((state) => ({
          ...state,
          count: countMap.get(state.id) || 0,
        }));
      });

    const highestCountState = findHighestCount(count) || { count: 0 };

    const groupedTasks = {
      [STATES.TODO]: {
        data: mapTasks(todoTasks),
        total: count.find((state) => state.stateName === STATES.TODO)?.count,
      },
      [STATES.IN_PROGRESS]: {
        data: mapTasks(inProgressTasks),
        total: count.find((state) => state.stateName === STATES.IN_PROGRESS)
          ?.count,
      },
      [STATES.DONE]: {
        data: mapTasks(doneTasks),
        total: count.find((state) => state.stateName === STATES.DONE)?.count,
      },
      totalPages: Math.round(highestCountState.count / limit),
    };

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
