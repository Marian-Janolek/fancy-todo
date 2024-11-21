import { NextResponse } from 'next/server';
import db from '@/utils/db';
import { STATES } from '@/app/types';
import { mapTasks } from '@/utils/functions';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit')) || 10;
  const page = Number(searchParams.get('page')) || 1;

  const skip = (page - 1) * limit;
  try {
    const [todoTasks, inProgressTasks, doneTasks, totalPages] =
      await Promise.all([
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
        db.task.count({
          where: {
            deletedAt: null,
          },
        }),
      ]);

    const groupedTasks = {
      [STATES.TODO]: mapTasks(todoTasks),
      [STATES.IN_PROGRESS]: mapTasks(inProgressTasks),
      [STATES.DONE]: mapTasks(doneTasks),
      totalPages: Math.round(totalPages / 3 / limit),
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
