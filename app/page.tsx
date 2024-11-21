'use client';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import TaskView from './components/task/TaskView';
import { FORM_MODE } from './types';
import dynamic from 'next/dynamic';

const DynamicTaskModal = dynamic(() => import('./components/modal/TaskModal'), {
  ssr: false,
});
const DynamicToast = dynamic(() => import('./components/toast/Toast'), {
  ssr: false,
});

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TaskView />
      <DynamicTaskModal mode={FORM_MODE.ADD} />
      <DynamicToast />
    </HydrationBoundary>
  );
}
