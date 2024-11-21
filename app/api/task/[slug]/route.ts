import { NextResponse } from 'next/server';
import db from '@/utils/db';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const body = await req.json();
  const slug = (await params).slug;
  const { nextState } = body;

  try {
    const taskId = Number(slug);
    if (isNaN(taskId)) {
      return NextResponse.json(
        { message: 'Missing slug' },
        { status: 404, statusText: 'Not found' }
      );
    }

    const taskState = await db.taskState.findUnique({
      where: { stateName: nextState },
    });

    if (!taskState) {
      return NextResponse.json(
        { message: `Task state ${nextState} not found` },
        { status: 404 }
      );
    }

    const taskExists = await db.task.count({ where: { id: Number(slug) } });

    if (taskExists !== 1) {
      return NextResponse.json(
        { message: 'Task not found' },
        { status: 404, statusText: 'Not found' }
      );
    }

    const updatedTask = await db.task.update({
      where: { id: Number(slug) },
      data: { stateId: taskState.id },
    });

    return NextResponse.json(
      {
        message: `Task <span class='text-violet-600 font-semibold'>${updatedTask.name}</span> updated successfully`,
      },
      { status: 200, statusText: 'OK' }
    );
  } catch (error) {
    console.error('Error while updating tasks', error);
    return NextResponse.json(
      {
        message: 'An error occurred while removing the task',
      },
      {
        status: 500,
        statusText: 'Internal Server Error',
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;

  try {
    const taskId = Number(slug);
    if (isNaN(taskId)) {
      return NextResponse.json(
        { message: 'Missing slug' },
        { status: 404, statusText: 'Not found' }
      );
    }

    const taskExists = await db.task.count({ where: { id: Number(slug) } });

    if (taskExists !== 1) {
      return NextResponse.json(
        { message: 'Task state found' },
        { status: 404, statusText: 'Not found' }
      );
    }

    const removedTask = await db.task.update({
      where: { id: Number(slug) },
      data: {
        deletedAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: `Task <span class='text-violet-600 font-semibold'>${removedTask.name}</span> removed successfully`,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error while fetching tasks', error);
    return NextResponse.json(
      {
        message: 'An error occurred while removing the task',
      },
      {
        status: 500,
        statusText: 'Internal Server Error',
      }
    );
  }
}
