<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const currentPageTitle = computed(() => {
  switch (route.name) {
    case 'dashboard': return 'System Overview'
    case 'automations': return 'Automation Manager'
    case 'outreach': return 'Outreach Inbox'
    case 'vault': return 'Secure Vault'
    case 'settings': return 'User Settings'
    default: return 'Dashboard'
  }
})
</script>

<template>
  <el-container class="h-screen bg-[var(--color-brand-bg)] w-screen overflow-hidden text-[#E2E8F0]">
    
    <!-- Sidebar -->
    <el-aside width="240px" class="flex flex-col border-r border-[#27272A] bg-[#1A1A1D]">
      <div class="h-16 flex items-center px-6">
        <h2 class="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <el-icon color="#2ECC71"><Cpu /></el-icon>
          Sentinel
        </h2>
      </div>

      <el-menu
        :default-active="route.name as string"
        router
        class="flex-1 border-none bg-transparent 
          [&_.el-menu-item.is-active]:!bg-[#0F4C8166] 
          [&_.el-menu-item.is-active]:border-l-[3px] 
          [&_.el-menu-item.is-active]:border-[var(--color-brand-accent)]
          [&_.el-menu-item:hover]:!bg-[rgba(255,255,255,0.05)]"
        background-color="transparent"
        text-color="#a1a1aa"
        active-text-color="#f4f4f5"
      >
        <el-menu-item index="dashboard" :route="{ name: 'dashboard' }">
          <el-icon><Monitor /></el-icon>
          <span>Dashboard</span>
        </el-menu-item>
        
        <el-menu-item index="automations" :route="{ name: 'automations' }" class="active-bg">
          <el-icon><CopyDocument /></el-icon>
          <span>Automations</span>
        </el-menu-item>
        
        <el-menu-item index="outreach" :route="{ name: 'outreach' }">
          <el-icon><Message /></el-icon>
          <span>Outreach</span>
        </el-menu-item>
        
        <el-menu-item index="vault" :route="{ name: 'vault' }">
          <el-icon><Lock /></el-icon>
          <span>Secure Vault</span>
        </el-menu-item>
        
        <el-menu-item index="settings" :route="{ name: 'settings' }">
          <el-icon><Setting /></el-icon>
          <span>Settings</span>
        </el-menu-item>
      </el-menu>

      <!-- User Profile Widget -->
      <div class="p-4 border-t border-[#27272A] flex items-center gap-3">
        <el-avatar :size="36" class="bg-[var(--color-brand-accent)]">AK</el-avatar>
        <div class="flex-1 overflow-hidden">
          <p class="text-sm font-medium text-white truncate">Attaullah Khan</p>
          <p class="text-[10px] text-zinc-500 font-technical uppercase tracking-wider">Admin - Pakistan</p>
        </div>
        <div class="w-2 h-2 rounded-full bg-[var(--color-brand-success)] animate-pulse"></div>
      </div>
    </el-aside>

    <!-- Main Content -->
    <el-container class="flex flex-col bg-[#1A1A1D]">
      
      <!-- Topbar -->
      <el-header height="64px" class="flex items-center justify-between border-b border-[#27272A] px-8 bg-[#1A1A1D]">
        <div class="text-lg font-mono tracking-widest text-[#a1a1aa]">
          // {{ currentPageTitle.toUpperCase() }}
        </div>
        
        <div class="flex items-center gap-4">
          <!-- Multi-language Toggle -->
          <el-radio-group size="small" model-value="EN" class="font-technical">
            <el-radio-button label="EN" />
            <el-radio-button label="DE" />
          </el-radio-group>
        </div>
      </el-header>

      <!-- Router View Container -->
      <el-main class="p-8 overflow-y-auto 
        [&::-webkit-scrollbar]:w-2 
        [&::-webkit-scrollbar-track]:bg-transparent 
        [&::-webkit-scrollbar-thumb]:bg-zinc-700 
        [&::-webkit-scrollbar-thumb]:rounded-full 
        hover:[&::-webkit-scrollbar-thumb]:bg-zinc-600"
      >
        <router-view v-slot="{ Component }">
          <transition name="el-fade-in-linear" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
