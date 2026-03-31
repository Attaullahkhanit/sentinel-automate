<script setup lang="ts">
import { ref } from 'vue'
import { useAutomationStore } from '../store/automationStore'
import { Play, SquarePen, X } from 'lucide-vue-next'

const store = useAutomationStore()
const globalHeaded = ref(true)

const handleRunAutomation = async (taskId: string) => {
  store.updateTaskStatus(taskId, 'Running')
  try {
    // @ts-ignore
    await window.electronAPI?.runAutomation?.(taskId)
    setTimeout(() => {
      store.updateTaskStatus(taskId, 'Idle')
    }, 2000)
  } catch (err) {
    store.updateTaskStatus(taskId, 'Failed')
  }
}

const mockTasks = [
  { id: '1', name: 'Check Website Status', browser: 'Chromium', headedMode: true, lastRun: '2025-01-14 09:42:10', status: 'Running', nextRun: 'in 3m 22s' },
  { id: '2', name: 'Scrape Competitor Prices', browser: 'Firefox', headedMode: false, lastRun: '2025-01-14 09:15:03', status: 'Idle', nextRun: 'in 45m 00s' },
  { id: '3', name: 'IMAP Inbox Sync', browser: 'imap-simple', headedMode: false, lastRun: '2025-01-14 09:45:00', status: 'Failed', nextRun: 'in 1m 08s' },
  { id: '4', name: 'Form Auto-Submission', browser: 'Chromium', headedMode: true, lastRun: '2025-01-14 08:00:00', status: 'Failed', nextRun: 'paused' },
  { id: '5', name: 'API Health Monitor', browser: 'node-cron', headedMode: false, lastRun: '2025-01-14 09:44:00', status: 'Running', nextRun: 'in 1m 00s' },
  { id: '6', name: 'LinkedIn Lead Extract', browser: 'Chromium', headedMode: true, lastRun: '2025-01-13 22:30:11', status: 'Idle', nextRun: '21:30:00' },
]

const addModalVisible = ref(false)
const newTask = ref({
  name: '',
  browser: 'Chromium',
  schedule: '0 9 * * *',
  group: 'AUTOMATION ACCOUNTS',
  headed: false
})
const browsers = ['Chromium', 'Firefox', 'WebKit', 'Headless']
const credentialGroups = ['AUTOMATION ACCOUNTS', 'API KEYS', 'DATABASES']

const handleSaveTask = () => {
  addModalVisible.value = false
}

const getStatusColor = (status: string) => {
  if (status === 'Running') return 'var(--success)'
  if (status === 'Failed') return 'var(--danger)'
  if (status === 'Queued') return 'var(--warning)'
  return 'var(--success)' // Default for Idle in their screenshot
}
</script>

<template>
  <div class="automation-view">
    
    <!-- STATS GRID -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">ACTIVE TASKS</div>
        <div class="stat-value text-success">7</div>
        <div class="stat-sub">↑ 2 from yesterday</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">RUNS TODAY</div>
        <div class="stat-value text-primary">142</div>
        <div class="stat-sub">avg 4.2s / run</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">FAILED</div>
        <div class="stat-value text-danger">2</div>
        <div class="stat-sub">last 24h</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">HEADED MODE</div>
        <div class="stat-value text-warning">3</div>
        <div class="stat-sub">Chromium instances</div>
      </div>
    </div>

    <!-- TOOLBAR -->
    <div class="toolbar">
      <div class="global-toggle">
        <span class="toggle-label tech-font">HEADED MODE:</span>
        <el-switch
          v-model="globalHeaded"
          active-color="var(--success)"
          inactive-color="var(--border-color)"
        />
        <span class="toggle-status tech-font text-success">ENABLED - Electron Browser Visible</span>
      </div>
      
      <el-button type="primary" class="new-task-btn tech-font" @click="addModalVisible = true">
        + NEW TASK
      </el-button>
    </div>

    <!-- TABLE -->
    <div class="table-container">
      <el-table :data="mockTasks" class="dark-tech-table">
        <el-table-column label="TASK NAME" width="280">
          <template #default="{ row }">
            <div class="task-info">
              <span class="task-title">{{ row.name }}</span>
              <span class="task-subtitle tech-font">playwright · {{ row.browser.toLowerCase() }}</span>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column label="BROWSER" width="160">
          <template #default="{ row }">
            <span class="tag-badge" :class="row.headedMode ? 'tag-headed' : 'tag-headless'">
              {{ row.headedMode ? 'HEADED' : 'HEADLESS' }}
            </span>
          </template>
        </el-table-column>

        <el-table-column label="LAST RUN" prop="lastRun" min-width="180">
          <template #default="{ row }">
            <span class="tech-font text-muted">{{ row.lastRun }}</span>
          </template>
        </el-table-column>

        <el-table-column label="STATUS" width="140">
          <template #default="{ row }">
            <div class="status-cell tech-font" :style="{ color: getStatusColor(row.status) }">
              <div class="status-dot" :style="{ backgroundColor: getStatusColor(row.status) }"></div>
              <span>{{ row.status === 'Failed' ? 'Error' : row.status }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="NEXT RUN" prop="nextRun" width="140">
          <template #default="{ row }">
            <span class="tech-font text-muted">{{ row.nextRun }}</span>
          </template>
        </el-table-column>

        <el-table-column label="ACTIONS" width="150" align="right">
          <template #default="{ row }">
            <div class="action-buttons">
              <button class="icon-btn" @click="handleRunAutomation(row.id)"><Play :size="12" /></button>
              <button class="icon-btn"><SquarePen :size="12" /></button>
              <button class="icon-btn"><X :size="12" /></button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- ADD NEW TASK MODAL -->
    <el-dialog
      v-model="addModalVisible"
      title="// ADD NEW TASK"
      width="480px"
      class="tech-modal"
      :show-close="false"
    >
      <template #header="{ close, titleId }">
        <div class="custom-modal-header">
          <span :id="titleId" class="tech-header text-primary">// ADD NEW TASK</span>
          <button class="icon-btn close-btn" @click="close"><X :size="16" /></button>
        </div>
      </template>

      <div class="modal-form">
        <div class="form-group">
          <label class="tech-font">TASK NAME</label>
          <el-input v-model="newTask.name" placeholder="e.g. Scrape Competitor Prices" class="tech-input" />
        </div>
        
        <div class="form-group">
          <label class="tech-font">TARGET BROWSER</label>
          <el-select v-model="newTask.browser" class="tech-select w-100" popper-class="tech-popper">
            <el-option v-for="b in browsers" :key="b" :label="b" :value="b" />
          </el-select>
        </div>
        
        <div class="form-group">
          <label class="tech-font">SCHEDULE (CRON FORMAT)</label>
          <el-input v-model="newTask.schedule" placeholder="0 9 * * *" class="tech-input" />
        </div>
        
        <div class="form-group">
          <label class="tech-font">CREDENTIAL GROUP</label>
          <el-select v-model="newTask.group" class="tech-select w-100" popper-class="tech-popper">
            <el-option v-for="g in credentialGroups" :key="g" :label="g" :value="g" />
          </el-select>
        </div>
        
        <div class="form-group toggle-group mt-3">
          <label class="tech-font">START AUTOMATION IMMEDIATELY</label>
          <el-switch
            v-model="newTask.headed"
            active-color="var(--success)"
            inactive-color="var(--border-color)"
          />
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addModalVisible = false" class="outline-btn tech-font">Cancel</el-button>
          <el-button type="primary" @click="handleSaveTask" class="primary-btn tech-font">
            Create Task
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.automation-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tech-font {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.5px;
}

.text-muted { color: var(--text-muted); }
.text-success { color: var(--success); }
.text-danger { color: var(--danger); }
.text-warning { color: var(--warning); }
.text-primary { color: #60a5fa; }

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  
  .stat-card {
    border: 1px solid var(--border-color);
    background-color: var(--bg-surface);
    border-radius: 4px;
    padding: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    
    .stat-label {
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--text-secondary);
      letter-spacing: 1px;
      margin-bottom: 0.5rem;
    }
    
    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      line-height: 1;
      margin-bottom: 0.5rem;
      font-family: var(--font-mono);
    }
    
    .stat-sub {
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--text-muted);
    }
  }
}

/* Toolbar */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1rem;
  
  .global-toggle {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    .toggle-label {
      color: var(--text-secondary);
      font-weight: 600;
    }
    
    .toggle-status {
      font-weight: 600;
    }
  }
  
  .new-task-btn {
    border-radius: 4px;
    font-weight: 600;
    padding: 8px 16px;
    height: 32px;
  }
}

/* Table container */
.table-container {
  width: 100%;
}

:deep(.dark-tech-table) {
  --el-table-bg-color: transparent;
  --el-table-tr-bg-color: transparent;
  --el-table-header-bg-color: transparent;
  --el-table-border-color: var(--border-color);
  
  .el-table__inner-wrapper::before {
    display: none;
  }
  
  th.el-table__cell {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-secondary);
    border-bottom: 1px solid var(--border-color);
    padding: 12px 0;
  }
  
  td.el-table__cell {
    border-bottom: 1px solid var(--border-color);
    padding: 12px 0;
  }
}

/* Table internals */
.task-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  .task-title {
    font-weight: 600;
    font-size: 14px;
    color: var(--text-primary);
  }
  
  .task-subtitle {
    color: var(--text-muted);
  }
}

.tag-badge {
  font-family: var(--font-mono);
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
  
  &.tag-headed {
    background-color: rgba(16, 185, 129, 0.1);
    color: var(--success);
  }
  
  &.tag-headless {
    background-color: var(--bg-surface-light);
    color: var(--text-secondary);
  }
}

.status-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  
  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
}

.action-buttons {
  display: flex;
  gap: 6px;
  justify-content: flex-end;
  
  .icon-btn {
    background: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
    width: 24px;
    height: 24px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      border-color: var(--text-primary);
      color: var(--text-primary);
      background-color: var(--bg-surface-light);
    }
  }
}

.primary-btn {
  background-color: var(--primary) !important;
  color: #fff !important;
  border: none !important;
  border-radius: 4px;
  font-weight: 600;
}

.outline-btn {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  border-radius: 4px;
  font-weight: 600;
  
  &:hover {
    background-color: var(--bg-surface-light);
    color: var(--text-primary);
    border-color: var(--text-primary);
  }
}

/* Modal Overrides */
:deep(.tech-modal) {
  --el-dialog-bg-color: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  
  .el-dialog__header {
    border-bottom: 1px solid var(--border-color);
    margin-right: 0;
    padding: 16px 20px;
  }
  
  .custom-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .close-btn {
      background: transparent;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      &:hover { color: var(--text-primary); }
    }
  }
  
  .el-dialog__body {
    padding: 20px;
  }
  
  .el-dialog__footer {
    border-top: 1px solid var(--border-color);
    padding: 16px 20px;
    background-color: var(--bg-surface-light);
  }
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    label {
      color: var(--text-secondary);
      font-weight: 600;
    }
  }

  .toggle-group {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.mt-3 { margin-top: 12px; }

:deep(.tech-input) {
  .el-input__wrapper {
    background-color: var(--bg-main);
    border: 1px solid var(--border-color);
    box-shadow: none !important;
    
    &.is-focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 1px var(--primary) !important;
    }
    
    .el-input__inner {
      color: var(--text-primary);
      font-family: var(--font-mono);
      font-size: 13px;
    }
  }
}

:deep(.tech-select) {
  .el-select__wrapper {
    background-color: var(--bg-main);
    box-shadow: none !important;
    border: 1px solid var(--border-color);
    font-family: var(--font-mono);
    
    &.is-focused {
      border-color: var(--primary);
    }
  }
}

.w-100 { width: 100%; }
</style>
