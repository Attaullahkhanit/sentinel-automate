import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAutomationStore = defineStore('automation', () => {
  const headedMode = ref(true)
  
  const tasks = ref([
    { id: 1, name: 'Check Website Status', engine: 'playwright • chromium', isHeaded: true, lastRun: '2025-01-14 09:42:10', status: 'Running', nextRun: 'in 3m 22s' },
    { id: 2, name: 'Scrape Competitor Prices', engine: 'playwright • firefox', isHeaded: false, lastRun: '2025-01-14 09:15:03', status: 'Idle', nextRun: 'in 45m 00s' },
    { id: 3, name: 'IMAP Inbox Sync', engine: 'playwright • imap-simple', isHeaded: false, lastRun: '2025-01-14 09:45:00', status: 'Error', nextRun: 'in 1m 00s' },
    { id: 4, name: 'Form Auto-Submission', engine: 'playwright • chromium', isHeaded: true, lastRun: '2025-01-14 08:00:00', status: 'Error', nextRun: 'paused' },
    { id: 5, name: 'API Health Monitor', engine: 'playwright • node-cron', isHeaded: false, lastRun: '2025-01-14 09:44:00', status: 'Running', nextRun: 'in 1m 00s' },
    { id: 6, name: 'LinkedIn Lead Extract', engine: 'playwright • chromium', isHeaded: true, lastRun: '2025-01-13 22:30:11', status: 'Idle', nextRun: '21:30:00' },
  ])

  const stats = ref([
    { label: 'ACTIVE TASKS', value: '7', sub: '+ 2 from yesterday' },
    { label: 'RUNS TODAY', value: '142', sub: 'avg 4.2s / run', accent: true },
    { label: 'FAILED', value: '2', sub: 'last 24h', danger: true },
    { label: 'HEADED MODE', value: '3', sub: 'Chromium instances', warning: true }
  ])

  function addTask(newTask: any) {
    tasks.value.push({
      id: tasks.value.length + 1,
      ...newTask,
      lastRun: '-',
      status: 'Idle',
      nextRun: 'scheduled'
    })
  }

  async function runTask(task: any) {
    const target = tasks.value.find(t => t.id === task.id)
    if (!target) return

    target.status = 'Running'
    target.lastRun = new Date().toLocaleString()

    try {
      // @ts-ignore
      const result = await window.electronAPI.runTask({
        id: task.id,
        name: task.name,
        isHeaded: headedMode.value
      })

      if (result.success) {
        target.status = 'Idle'
      } else {
        target.status = 'Error'
      }
    } catch (error) {
      console.error('Failed to run task:', error)
      target.status = 'Error'
    }
  }

  return { headedMode, tasks, stats, addTask, runTask }
})
