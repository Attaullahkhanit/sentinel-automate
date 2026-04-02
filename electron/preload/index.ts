import { contextBridge, ipcRenderer } from 'electron'

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  onMainProcessMessage: (callback: (message: string) => void) => {
    ipcRenderer.on('main-process-message', (_event, message) => callback(message))
  },
  runTask: (task: { id: number; name: string; isHeaded: boolean }) => {
    return ipcRenderer.invoke('automation:run-task', task)
  },
  stopAll: () => {
    return ipcRenderer.invoke('automation:stop-all')
  },
})
