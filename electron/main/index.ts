import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import { automationService } from './services/AutomationService'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Initialize the SQLite database using Prisma 7.
 * Ensures the userData directory exists, then runs db push and generate.
 */
async function initializeDatabase() {
  const userDataPath = app.getPath('userData')
  const dbPath = path.join(userDataPath, 'sentinel.db')
  
  // Prisma 7 CLI needs this environment variable
  process.env.DATABASE_URL = `file:${dbPath}`
  
  console.log(`[Database] Initializing at: ${dbPath}`)
  
  if (!fs.existsSync(userDataPath)) {
    fs.mkdirSync(userDataPath, { recursive: true })
  }

  try {
    // Run Prisma commands
    // We use --accept-data-loss for db push in Electron to ensure the schema is synced
    console.log('[Database] Syncing schema with db push...')
    execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' })
    
    console.log('[Database] Generating Prisma Client...')
    execSync('npx prisma generate', { stdio: 'inherit' })
    
    console.log('[Database] Initialization complete.')
  } catch (error) {
    console.error('[Database] Failed to initialize:', error)
  }
}

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#1A1A1D',
    title: 'Sentinel Automate',
    icon: path.join(process.env.VITE_PUBLIC || '', 'favicon.ico'),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.mjs'),
    },
  })

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(async () => {
  await initializeDatabase()
  createWindow()

  // Automation IPC Handlers
  ipcMain.handle('automation:run-task', async (_event, { id, name, isHeaded }) => {
    return await automationService.runTask(id, name, isHeaded)
  })

  ipcMain.handle('automation:stop-all', async () => {
    await automationService.stopAll()
    return { success: true }
  })
})
