import { NextResponse } from 'next/server';
import db from '@/utils/db';
import { STATES } from '@/app/types';

export async function PUT(req: Request) {
  const body = await req.json();
  const { id: taskId, name } = body;

  try {
    if (!taskId) {
      const taskState = await db.taskState.findUnique({
        where: { stateName: STATES.TODO },
      });

      if (!taskState) {
        return NextResponse.json(
          { message: ` Task state not found` },
          { status: 404 }
        );
      }

      const newTask = await db.task.create({
        data: {
          name,
          stateId: taskState.id,
        },
      });

      return NextResponse.json(
        {
          message: `Task <span class='text-primary font-semibold'>${newTask.name}</span> was created successfully`,
        },
        { status: 201 }
      );
    }

    // If taskId is provided, we are updating an existing task
    const existingTask = await db.task.findUnique({
      where: { id: taskId },
    });

    if (!existingTask) {
      return NextResponse.json({ message: `Task not found` }, { status: 404 });
    }

    const updatedTask = await db.task.update({
      where: { id: taskId },
      data: { name },
    });

    return NextResponse.json(
      {
        message: `Task <span class='text-primary font-semibold'>${updatedTask.name}</span> was updated successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error while modifying task', error);
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
