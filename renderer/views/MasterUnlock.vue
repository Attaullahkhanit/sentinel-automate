<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const password = ref('')
const isLocked = ref(true)
const isUnlocking = ref(false)

const handleUnlock = () => {
  if (!password.value) return
  isUnlocking.value = true
  
  // Simulate unlock delay
  setTimeout(() => {
    isLocked.value = false
    isUnlocking.value = false
    setTimeout(() => {
      router.push('/automations')
    }, 500)
  }, 1200)
}
</script>

<template>
  <div class="h-screen w-screen flex flex-col items-center justify-center bg-[var(--color-brand-bg)]">
    <!-- Master Unlock Card -->
    <div class="w-full max-w-sm p-8 bg-[#27272A] rounded-lg border border-[#3f3f46] shadow-2xl relative overflow-hidden">
      <!-- Status Indicator -->
      <div class="absolute top-0 left-0 w-full h-1" :class="isLocked ? 'bg-red-500' : 'bg-[var(--color-brand-success)] transition-colors duration-500'"></div>
      
      <div class="flex flex-col items-center mb-8">
        <el-icon :size="48" :color="isLocked ? '#E74C3C' : '#2ECC71'" class="mb-4 transition-colors duration-500">
          <Lock v-if="isLocked" />
          <Unlock v-else />
        </el-icon>
        <h1 class="text-2xl font-bold text-white font-technical tracking-tight">Sentinel Automate</h1>
        <p class="text-sm font-technical mt-2 transition-colors duration-500" :class="isLocked ? 'text-red-400' : 'text-green-400'">
          <span class="inline-block w-2 h-2 rounded-full mr-2" :class="isLocked ? 'bg-red-500 animate-pulse' : 'bg-green-500'"></span>
          SQLite & Vault {{ isLocked ? 'Locked' : 'Unlocked' }}
        </p>
      </div>

      <form @submit.prevent="handleUnlock" class="flex flex-col gap-4">
        <div>
          <label class="block text-xs font-technical text-zinc-400 mb-1 uppercase tracking-wider">Master Password</label>
          <el-input 
            v-model="password" 
            type="password" 
            placeholder="••••••••••••" 
            show-password
            size="large"
            :disabled="!isLocked || isUnlocking"
          >
            <template #prefix>
              <el-icon><Key /></el-icon>
            </template>
          </el-input>
        </div>

        <el-button 
          type="primary" 
          size="large" 
          class="w-full font-technical tracking-wide mt-2" 
          :loading="isUnlocking"
          :disabled="!isLocked"
          @click="handleUnlock"
        >
          {{ isLocked ? (isUnlocking ? 'Decrypting...' : 'Unlock Systems') : 'Access Granted' }}
        </el-button>
      </form>
    </div>
    
    <div class="mt-8 text-xs text-zinc-500 font-technical">
      Sentinel Corp. Berlin &copy; 2026 | Enterprise Edition
    </div>
  </div>
</template>
