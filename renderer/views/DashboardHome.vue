<script setup lang="ts">
import { ref } from 'vue'

const systemHealth = ref([
  { label: 'Runtime Engine', status: 'Healthy', version: 'Playwright v1.49.0', icon: 'Cpu' },
  { label: 'SQLite DB', status: 'Encrypted', version: 'v3.45.1', icon: 'Box' },
  { label: 'IMAP Gateway', status: 'Connected', latency: '42ms', icon: 'Connection' },
  { label: 'Electron Wrapper', status: 'Stable', version: 'v32.0.0', icon: 'Monitor' },
])

const recentActivity = ref([
  { id: 1, type: 'Automation', name: 'Check Website Status', status: 'Success', time: '2 mins ago' },
  { id: 2, type: 'Outreach', name: 'Email Scraped: michael@example.com', status: 'Neutral', time: '15 mins ago' },
  { id: 3, type: 'Vault', name: 'Credential Accessed: AWS Console', status: 'Secure', time: '1 hour ago' },
  { id: 4, type: 'Automation', name: 'IMAP Inbox Sync', status: 'Success', time: '3 hours ago' },
])
</script>

<template>
  <div class="flex flex-col gap-8">
    
    <!-- Hero Section -->
    <div class="grid grid-cols-2 gap-8">
      <div class="p-8 bg-[#232326] border border-[#27272A] rounded-lg relative overflow-hidden">
        <div class="absolute -right-16 -top-16 w-64 h-64 bg-[var(--color-brand-accent)] opacity-10 rounded-full blur-3xl"></div>
        <h1 class="text-3xl font-bold text-white mb-2 relative z-10 font-technical tracking-tight">System Status: Optimal</h1>
        <p class="text-zinc-400 font-technical text-sm relative z-10">Sentinel Automate is currently monitoring 7 active tasks with 100% success rate over the last 60 minutes.</p>
        <div class="mt-6 flex items-center gap-4 relative z-10">
          <div class="flex flex-col">
            <span class="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Uptime</span>
            <span class="text-xl font-mono text-[var(--color-brand-success)]">99.98%</span>
          </div>
          <div class="w-px h-8 bg-zinc-700 mx-4"></div>
          <div class="flex flex-col">
            <span class="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">CPU Usage</span>
            <span class="text-xl font-mono text-[var(--color-brand-accent)]">1.2%</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div v-for="health in systemHealth" :key="health.label" class="p-4 bg-[#1A1A1D] border border-[#27272A] rounded">
          <div class="flex items-center gap-2 mb-2 text-[var(--color-brand-accent)]">
            <el-icon><component :is="health.icon" /></el-icon>
            <span class="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{{ health.label }}</span>
          </div>
          <div class="text-sm font-technical text-white mb-1">{{ health.status }}</div>
          <div class="text-[10px] text-zinc-600 font-mono">{{ health.version || health.latency }}</div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div>
      <h2 class="text-sm font-technical text-zinc-500 uppercase tracking-widest font-bold mb-4 border-l-2 border-[var(--color-brand-accent)] pl-3">
        Recent Activity Stream
      </h2>
      <div class="bg-[#232326] border border-[#27272A] rounded-lg overflow-hidden">
        <div v-for="activity in recentActivity" :key="activity.id" class="p-4 border-b border-[#27272A] last:border-0 flex items-center justify-between hover:bg-[rgba(255,255,255,0.02)] transition-colors">
          <div class="flex items-center gap-4">
            <div class="w-8 h-8 rounded bg-[#1A1A1D] flex items-center justify-center border border-[#27272A]">
              <el-icon v-if="activity.type === 'Automation'" color="#2ECC71"><Cpu /></el-icon>
              <el-icon v-else-if="activity.type === 'Outreach'" color="#0F4C81"><Message /></el-icon>
              <el-icon v-else color="#E74C3C"><Lock /></el-icon>
            </div>
            <div>
              <div class="text-sm font-bold text-zinc-200">{{ activity.name }}</div>
              <div class="text-[10px] text-zinc-500 font-technical">{{ activity.type }} • {{ activity.time }}</div>
            </div>
          </div>
          <el-tag size="small" :type="activity.status === 'Success' || activity.status === 'Secure' ? 'success' : 'info'" effect="plain" class="font-technical text-[10px] uppercase font-bold tracking-wider rounded-sm shrink-0">
            {{ activity.status }}
          </el-tag>
        </div>
      </div>
    </div>

  </div>
</template>
