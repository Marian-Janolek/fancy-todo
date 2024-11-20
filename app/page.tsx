'use client';

import TaskView from './components/task/TaskView';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import { FORM_MODE } from './types';
import dynamic from 'next/dynamic';

const DynamicTaskModal = dynamic(() => import('./components/modal/TaskModal'), {
  ssr: false,
});
const DynamicToast = dynamic(() => import('./components/toast/Toast'), {
  ssr: false,
});

export default function Home() {
  return (
    <AppProvider>
      <Navbar />
      <TaskView />
      <DynamicTaskModal mode={FORM_MODE.ADD} />
      <DynamicToast />
    </AppProvider>
  );
}
