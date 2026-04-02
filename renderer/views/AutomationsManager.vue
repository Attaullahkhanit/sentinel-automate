<script setup lang="ts">
import { ref } from 'vue'
import { useAutomationStore } from '../stores/automation'
import { storeToRefs } from 'pinia'

const automationStore = useAutomationStore()
const { tasks, stats, headedMode } = storeToRefs(automationStore)

const isModalOpen = ref(false)

const newTaskForm = ref({
  name: '',
  browser: 'Chromium',
  schedule: '0 9 * * *',
  credentialGroup: 'AUTOMATION ACCOUNTS',
  startImmediately: false
})

const handleAddTask = () => {
  automationStore.addTask({
    name: newTaskForm.value.name,
    engine: `playwright • ${newTaskForm.value.browser.toLowerCase()}`,
    isHeaded: true // simplified
  })
  isModalOpen.value = false
  // Reset form
  newTaskForm.value.name = ''
}

const getStatusColor = (status: string) => {
  if (status === 'Running') return '#2ECC71'
  if (status === 'Idle') return '#95A5A6'
  if (status === 'Error') return '#E74C3C'
  return '#95A5A6'
}
</script>

<template>
  <div class="flex flex-col gap-8 flex-1">
    
    <!-- Top Stats -->
    <div class="grid grid-cols-4 gap-4">
      <div v-for="(stat, idx) in stats" :key="idx" class="p-4 bg-[#232326] border border-[#27272A] rounded">
        <div class="text-[10px] text-zinc-500 uppercase tracking-widest font-technical mb-2">{{ stat.label }}</div>
        <div class="text-3xl font-bold mb-1" :class="{
          'text-[var(--color-brand-accent)]': stat.accent,
          'text-[var(--color-brand-danger)]': stat.danger,
          'text-orange-400': stat.warning,
          'text-[var(--color-brand-success)]': !stat.accent && !stat.danger && !stat.warning
        }">
          {{ stat.value }}
        </div>
        <div class="text-xs text-zinc-600 font-technical">{{ stat.sub }}</div>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4 text-sm text-zinc-400 font-technical tracking-wide">
        HEADED MODE:
        <el-switch
          v-model="headedMode"
          inline-prompt
          active-text="ON"
          inactive-text="OFF"
          style="--el-switch-on-color: var(--color-brand-accent);"
        />
        <span v-if="headedMode" class="text-[var(--color-brand-success)] text-xs border border-[var(--color-brand-success)] px-2 py-0.5 rounded opacity-80">
          ENABLED - Electron Browser Visible
        </span>
      </div>
      
      <el-button type="primary" @click="isModalOpen = true" class="font-technical tracking-wide">
        + NEW TASK
      </el-button>
    </div>

    <!-- Table -->
    <el-table :data="tasks" style="width: 100%" class="font-technical custom-dark-table">
      <el-table-column label="TASK NAME" min-width="250">
        <template #default="{ row }">
          <div class="font-medium text-zinc-200">{{ row.name }}</div>
          <div class="text-xs text-zinc-600 mt-1">{{ row.engine }}</div>
        </template>
      </el-table-column>
      
      <el-table-column label="BROWSER" width="120">
        <template #default="{ row }">
          <span :class="row.isHeaded ? 'text-green-500' : 'text-zinc-500'" class="text-[10px] tracking-wider font-bold">
            {{ row.isHeaded ? 'HEADED' : 'HEADLESS' }}
          </span>
        </template>
      </el-table-column>
      
      <el-table-column prop="lastRun" label="LAST RUN" min-width="180" class-name="text-zinc-500" />
      
      <el-table-column label="STATUS" width="120">
        <template #default="{ row }">
          <div class="flex items-center gap-2 text-sm" :style="{ color: getStatusColor(row.status) }">
            <span class="w-1.5 h-1.5 rounded-full" :class="{ 'animate-pulse': row.status === 'Running' }" :style="{ backgroundColor: getStatusColor(row.status) }"></span>
            {{ row.status }}
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="nextRun" label="NEXT RUN" width="140" class-name="text-zinc-500" />
      
      <el-table-column label="ACTIONS" width="140" align="right">
        <template #default="{ row }">
          <div class="flex justify-end gap-1">
            <el-button 
              size="small" 
              circle 
              plain 
              @click="automationStore.runTask(row)"
              :loading="row.status === 'Running'"
              class="!bg-transparent !border-zinc-700 !text-zinc-400 hover:!text-[var(--color-brand-success)] hover:!border-[var(--color-brand-success)]"
            >
              <el-icon><VideoPlay /></el-icon>
            </el-button>
            <el-button size="small" circle plain class="!bg-transparent !border-zinc-700 !text-zinc-400 hover:!text-[var(--color-brand-accent)] hover:!border-[var(--color-brand-accent)]">
              <el-icon><Edit /></el-icon>
            </el-button>
            <el-button size="small" circle plain class="!bg-transparent !border-zinc-700 !text-zinc-400 hover:!text-red-500 hover:!border-red-500">
              <el-icon><Close /></el-icon>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- Add New Task Modal -->
    <el-dialog 
      v-model="isModalOpen" 
      title="// ADD NEW TASK" 
      width="500px" 
      class="font-technical
        !bg-[var(--color-brand-sub)] 
        !border !border-[#3f3f46] 
        !rounded-lg 
        [&_.el-dialog__title]:!text-[var(--color-brand-accent)] 
        [&_.el-dialog__title]:!font-mono 
        [&_.el-dialog__title]:!font-bold 
        [&_.el-dialog__title]:!tracking-[0.1em]
        [&_.el-dialog__header]:!border-b 
        [&_.el-dialog__header]:!border-[#3f3f46] 
        [&_.el-dialog__header]:!mr-0 
        [&_.el-dialog__header]:!pb-4
        [&_.el-dialog__footer]:!border-t 
        [&_.el-dialog__footer]:!border-[#3f3f46] 
        [&_.el-dialog__footer]:!pt-4
        [&_.el-input__wrapper]:!bg-[#1A1A1D] 
        [&_.el-input__wrapper]:!shadow-[0_0_0_1px_#3f3f46_inset]
        [&_.el-select__wrapper]:!bg-[#1A1A1D] 
        [&_.el-select__wrapper]:!shadow-[0_0_0_1px_#3f3f46_inset]
        [&_.el-input__inner]:!text-white"
    >
      <div class="flex flex-col gap-6">
        <div>
          <label class="block text-xs text-zinc-500 mb-2 uppercase tracking-wide">Task Name</label>
          <el-input v-model="newTaskForm.name" placeholder="e.g. Scrape Competitor Prices" class="!bg-transparent" />
        </div>
        
        <div>
          <label class="block text-xs text-zinc-500 mb-2 uppercase tracking-wide">Target Browser</label>
          <el-select v-model="newTaskForm.browser" class="w-full">
            <el-option label="Chromium" value="Chromium" />
            <el-option label="Firefox" value="Firefox" />
            <el-option label="WebKit" value="WebKit" />
          </el-select>
        </div>
        
        <div>
          <label class="block text-xs text-zinc-500 mb-2 uppercase tracking-wide">Schedule (Cron format)</label>
          <el-input v-model="newTaskForm.schedule" class="font-mono" />
        </div>
        
        <div>
          <label class="block text-xs text-zinc-500 mb-2 uppercase tracking-wide">Credential Group</label>
          <el-select v-model="newTaskForm.credentialGroup" class="w-full">
            <el-option label="AUTOMATION ACCOUNTS" value="AUTOMATION ACCOUNTS" />
            <el-option label="DATABASES" value="DATABASES" />
          </el-select>
        </div>
        
        <div class="flex items-center justify-between pt-2">
          <label class="text-xs text-zinc-500 uppercase tracking-wide">Start Automation Immediately</label>
          <el-switch v-model="newTaskForm.startImmediately" style="--el-switch-on-color: var(--color-brand-success)" />
        </div>
      </div>
      
      <template #footer>
        <div class="flex justify-end gap-3 font-technical">
          <el-button @click="isModalOpen = false" plain class="!bg-transparent !border-zinc-700 !text-zinc-400">Cancel</el-button>
          <el-button type="primary" @click="handleAddTask">Create Task</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
