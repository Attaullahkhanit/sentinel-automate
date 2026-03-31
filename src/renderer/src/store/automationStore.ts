import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { AutomationTask } from '../types';

export const useAutomationStore = defineStore('automation', () => {
  const tasks = ref<AutomationTask[]>([
    {
      id: 'task-1',
      name: 'Daily Outreach Scrape',
      status: 'Idle',
      headedMode: false,
      lastRun: '2 hours ago'
    },
    {
      id: 'task-2',
      name: 'Verify Support Inbox',
      status: 'Failed',
      headedMode: true,
      lastRun: '5 mins ago'
    },
    {
      id: 'task-3',
      name: 'Monitor Competitor Pricing',
      status: 'Running',
      headedMode: false,
      lastRun: 'Just now'
    }
  ]);

  const updateTaskStatus = (id: string, status: AutomationTask['status']) => {
    const task = tasks.value.find(t => t.id === id);
    if (task) {
      task.status = status;
    }
  };

  const toggleHeadedMode = (id: string) => {
    const task = tasks.value.find(t => t.id === id);
    if (task) {
      task.headedMode = !task.headedMode;
    }
  };

  return {
    tasks,
    updateTaskStatus,
    toggleHeadedMode
  };
});
