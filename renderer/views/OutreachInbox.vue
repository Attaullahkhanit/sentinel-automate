<script setup lang="ts">
import { useInboxStore } from '../stores/inbox'
import { storeToRefs } from 'pinia'

const inboxStore = useInboxStore()
const { emails, selectedEmailId } = storeToRefs(inboxStore)

const getSentimentType = (sentiment: string) => {
  if (sentiment === 'Positive') return 'success'
  if (sentiment === 'Alert') return 'danger'
  if (sentiment === 'Action Required') return 'warning'
  return 'info'
}

const getSentimentEffect = (sentiment: string) => {
  if (sentiment === 'Positive') return 'dark'
  return 'plain'
}
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Toolbar -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex gap-2">
        <el-button size="small" type="primary" plain class="font-technical">
          <el-icon class="mr-1"><Refresh /></el-icon> Sync Now
        </el-button>
        <el-button size="small" plain class="font-technical !bg-transparent !border-[#27272A] !text-zinc-400 hover:!text-white">
          <el-icon class="mr-1"><Filter /></el-icon> Filter
        </el-button>
      </div>
      <div class="text-xs font-technical text-zinc-500">
        Connected to: imap.hostinger.com (Port 993)
      </div>
    </div>

    <!-- Email Client Split Layout -->
    <div class="flex-1 flex border border-[#27272A] rounded overflow-hidden bg-[#1A1A1D]">
      
      <!-- List Pane -->
      <div class="w-1/3 border-r border-[#27272A] flex flex-col">
        <div class="p-3 border-b border-[#27272A] bg-[#232326]">
          <el-input 
            placeholder="Search emails..." 
            class="font-technical 
              [&_.el-input__wrapper]:!bg-transparent 
              [&_.el-input__wrapper]:!shadow-[0_0_0_1px_#3f3f46_inset] 
              [&_.el-input__inner]:!text-white"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>
        
        <div class="flex-1 overflow-y-auto 
          [&::-webkit-scrollbar]:w-2 
          [&::-webkit-scrollbar-track]:bg-transparent 
          [&::-webkit-scrollbar-thumb]:bg-zinc-700 
          [&::-webkit-scrollbar-thumb]:rounded-full 
          hover:[&::-webkit-scrollbar-thumb]:bg-zinc-600"
        >
          <div 
            v-for="email in emails" 
            :key="email.id"
            @click="selectedEmailId = email.id"
            class="p-4 border-b border-[#27272A] cursor-pointer hover:bg-[rgba(255,255,255,0.02)] transition-colors relative"
            :class="{ 'bg-[rgba(15,76,129,0.2)]': selectedEmailId === email.id }"
          >
            <div v-if="email.unread" class="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-brand-success)]"></div>
            
            <div class="flex justify-between items-baseline mb-1">
              <span class="font-medium text-sm text-zinc-200 truncate pr-2" :class="{ 'text-white font-bold': email.unread }">{{ email.sender }}</span>
              <span class="text-[10px] text-zinc-500 font-technical whitespace-nowrap">{{ email.date }}</span>
            </div>
            
            <div class="text-xs text-zinc-400 font-medium mb-2 truncate">{{ email.subject }}</div>
            
            <div class="flex items-center justify-between">
              <div class="text-[11px] text-zinc-500 truncate pr-4">{{ email.preview }}</div>
              <el-tag size="small" :type="getSentimentType(email.sentiment)" :effect="getSentimentEffect(email.sentiment)" class="font-technical text-[9px] uppercase font-bold tracking-wider rounded-sm shrink-0">
                {{ email.sentiment }}
              </el-tag>
            </div>
          </div>
        </div>
      </div>

      <!-- Reading Pane -->
      <div class="flex-1 flex flex-col bg-[#1A1A1D] relative">
        <template v-for="email in emails" :key="email.id">
          <div v-if="selectedEmailId === email.id" class="absolute inset-0 flex flex-col p-8">
            
            <div class="flex justify-between items-start mb-6 pb-6 border-b border-[#27272A]">
              <div>
                <h2 class="text-xl font-bold text-white mb-2">{{ email.subject }}</h2>
                <div class="text-sm font-technical text-zinc-400">
                  From: <span class="text-[var(--color-brand-accent)]">{{ email.sender }}</span> &lt;reply@example.com&gt;
                </div>
                <div class="text-xs font-technical text-zinc-500 mt-1">
                  {{ email.date }}
                </div>
              </div>
              
              <div class="flex gap-2">
                <el-button circle plain size="small" class="!bg-transparent !border-zinc-700 !text-zinc-400">
                  <el-icon><Back /></el-icon>
                </el-button>
                <el-button circle plain size="small" class="!bg-transparent !border-zinc-700 !text-zinc-400">
                  <el-icon><Delete /></el-icon>
                </el-button>
              </div>
            </div>
            
            <div class="flex-1 text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
              {{ email.preview }}
              
              Further details are outlined in the attachment. Let me know if you need anything else to proceed with the automation workflow integration. We want to ensure the Playwright scripts accurately capture the required fields before deploying to production.
              
              Best,
              {{ email.sender }}
            </div>
            
            <div class="mt-8 pt-6 border-t border-[#27272A]">
              <div class="bg-[#232326] rounded border border-[#27272A] p-4">
                <p class="text-[10px] font-technical text-zinc-500 mb-2 uppercase tracking-wide">Automated Response Context</p>
                <div class="flex items-center gap-4">
                  <el-tag size="small" type="success" effect="dark" class="font-technical text-[10px]">INTENT: POSITIVE_REPLY</el-tag>
                  <span class="text-xs text-zinc-400 font-mono">CONFIDENCE: 94.2%</span>
                </div>
              </div>
            </div>
            
          </div>
        </template>
      </div>
      
    </div>
  </div>
</template>
