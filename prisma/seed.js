const { PrismaClient } = require('@prisma/client');
const { statesData, taskData } = require('./data.js');
const prisma = new PrismaClient();

async function main() {
  const states = await prisma.taskState.createManyAndReturn({
    data: statesData,
  });

  if (states.length < 0) {
    console.error('Failed to create task states.');
    process.exit(1);
  }

  const taskToSeed = taskData.map((task, index) => {
    const stateIndex = index < 20 ? 0 : index < 35 ? 1 : 2;
    return {
      name: task.name,
      stateId: states[stateIndex].id,
    };
  });

  const tasks = await prisma.task.createManyAndReturn({
    data: taskToSeed,
  });

  if (tasks.length < 0) {
    console.error('Failed to create tasks.');
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
