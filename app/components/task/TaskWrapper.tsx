import TaskColumn from './TaskColumn';

const TaskWrapper = () => {
  return (
    <div className='grid grid-cols-1 gap-x-4 text-center md:grid-cols-2 xl:grid-cols-3'>
      <TaskColumn title='To do' />
      <TaskColumn title='In progress' />
      <TaskColumn title='Done' />
    </div>
  );
};
export default TaskWrapper;
