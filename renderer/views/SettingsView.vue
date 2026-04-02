<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('general')

const settings = ref({
  general: {
    language: 'EN',
    theme: 'Dark',
    notifications: true,
    startOnBoot: false
  },
  automation: {
    defaultBrowser: 'Chromium',
    headlessMode: true,
    timeout: 30000,
    maxConcurrentTasks: 5
  },
  imap: {
    host: 'imap.hostinger.com',
    port: 993,
    useSsl: true,
    syncInterval: 15
  }
})
</script>

<template>
  <div class="h-full flex flex-col gap-8">
    
    <div class="flex items-center justify-between border-b border-[#27272A] pb-4">
      <div class="text-xl font-bold font-mono tracking-widest text-[#a1a1aa] flex items-center gap-3">
        // SYSTEM SETTINGS
      </div>
      <el-button type="primary" class="font-technical tracking-wide">
        SAVE CONFIGURATION
      </el-button>
    </div>

    <el-tabs 
      v-model="activeTab" 
      class="flex-1 
        [&_.el-tabs__item]:font-mono 
        [&_.el-tabs__item]:text-[13px] 
        [&_.el-tabs__item]:tracking-widest 
        [&_.el-tabs__item]:uppercase 
        [&_.el-tabs__item]:text-zinc-500 
        [&_.el-tabs__item.is-active]:!text-white 
        [&_.el-tabs__active-bar]:!bg-[var(--color-brand-accent)] 
        [&_.el-tabs__header]:!border-b 
        [&_.el-tabs__header]:!border-[#27272A]"
    >
      
      <!-- General Settings -->
      <el-tab-pane label="General" name="general">
        <div class="p-8 bg-[#232326] border border-[#27272A] rounded-lg max-w-2xl flex flex-col gap-8">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-bold text-zinc-200 uppercase tracking-widest font-technical mb-1">Language</div>
              <div class="text-xs text-zinc-500 font-technical italic">Select the primary display language.</div>
            </div>
            <el-radio-group v-model="settings.general.language" size="small" class="font-technical">
              <el-radio-button label="EN" />
              <el-radio-button label="DE" />
            </el-radio-group>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-bold text-zinc-200 uppercase tracking-widest font-technical mb-1">Theme</div>
              <div class="text-xs text-zinc-500 font-technical italic">Select the visual appearance.</div>
            </div>
            <el-radio-group v-model="settings.general.theme" size="small" class="font-technical">
              <el-radio-button label="Dark" />
              <el-radio-button label="Light" />
            </el-radio-group>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-bold text-zinc-200 uppercase tracking-widest font-technical mb-1">App Notifications</div>
              <div class="text-xs text-zinc-500 font-technical italic">Enable system-wide notifications for failures.</div>
            </div>
            <el-switch v-model="settings.general.notifications" />
          </div>

          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-bold text-zinc-200 uppercase tracking-widest font-technical mb-1">Start on Boot</div>
              <div class="text-xs text-zinc-500 font-technical italic">Launch application automatically on login.</div>
            </div>
            <el-switch v-model="settings.general.startOnBoot" />
          </div>
        </div>
      </el-tab-pane>

      <!-- Automation Defaults -->
      <el-tab-pane label="Automation Defaults" name="automation">
        <div class="p-8 bg-[#232326] border border-[#27272A] rounded-lg max-w-2xl flex flex-col gap-6">
          <div class="bg-[rgba(15,76,129,0.1)] border border-[var(--color-brand-accent)] rounded p-4 mb-4">
            <p class="text-xs text-[var(--color-brand-accent)] font-technical italic tracking-wide">The following values are applied to all new tasks by default.</p>
          </div>
          
          <div>
            <label class="block text-xs uppercase text-zinc-500 mb-2 font-technical tracking-widest font-bold">Default Browser Engine</label>
            <el-select v-model="settings.automation.defaultBrowser" class="w-full">
              <el-option label="Chromium (Recommended)" value="Chromium" />
              <el-option label="Firefox" value="Firefox" />
              <el-option label="WebKit" value="WebKit" />
            </el-select>
          </div>

          <div class="grid grid-cols-2 gap-8">
            <div class="flex items-center justify-between p-4 border border-[#27272A] rounded bg-[#1A1A1D]">
              <div class="text-xs text-zinc-500 uppercase tracking-widest font-bold">Headless Mode</div>
              <el-switch v-model="settings.automation.headlessMode" />
            </div>
            <div class="flex items-center justify-between p-4 border border-[#27272A] rounded bg-[#1A1A1D]">
              <div class="text-xs text-zinc-500 uppercase tracking-widest font-bold">Max Concurrent</div>
              <el-input-number v-model="settings.automation.maxConcurrentTasks" size="small" />
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- Connection Settings -->
      <el-tab-pane label="Connection (IMAP)" name="imap">
        <div class="p-8 bg-[#232326] border border-[#27272A] rounded-lg max-w-2xl flex flex-col gap-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs uppercase text-zinc-500 mb-2 font-technical tracking-widest font-bold">IMAP Host</label>
              <el-input v-model="settings.imap.host" />
            </div>
            <div>
              <label class="block text-xs uppercase text-zinc-500 mb-2 font-technical tracking-widest font-bold">Port</label>
              <el-input-number v-model="settings.imap.port" />
            </div>
          </div>

          <div class="flex items-center justify-between p-4 border border-[#27272A] rounded bg-[#1A1A1D]">
            <div class="text-xs text-zinc-500 uppercase tracking-widest font-bold">Use SSL Encryption</div>
            <el-switch v-model="settings.imap.useSsl" />
          </div>

          <div>
             <label class="block text-xs uppercase text-zinc-500 mb-2 font-technical tracking-widest font-bold">Sync Interval (Minutes)</label>
             <el-slider v-model="settings.imap.syncInterval" :min="1" :max="60" />
          </div>
        </div>
      </el-tab-pane>

    </el-tabs>

  </div>
</template>
