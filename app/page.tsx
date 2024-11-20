'use client';

import TaskView from './components/task/TaskView';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import AddTaskModal from './components/modal/AddTaskModal';

export default function Home() {
  return (
    <AppProvider>
      <Navbar />
      <TaskView />
      <AddTaskModal />
    </AppProvider>
  );
}
