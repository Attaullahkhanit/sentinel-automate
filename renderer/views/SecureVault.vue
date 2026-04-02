<script setup lang="ts">
import { ref } from 'vue'
import { useVaultStore } from '../stores/vault'
import { storeToRefs } from 'pinia'

const vaultStore = useVaultStore()
const { credentialGroups } = storeToRefs(vaultStore)

const isModalOpen = ref(false)

const newCredentialForm = ref({
  serviceUrl: 'https://example.com/api',
  username: 'attaullah.khan@focusitservices.co.uk',
  password: 'my-super-secret-password',
  totpSecret: 'JBSWY3DPEHPK3PXP',
  group: 'AUTOMATION ACCOUNTS'
})

const handleAddCredential = () => {
  vaultStore.addCredential({ ...newCredentialForm.value })
  isModalOpen.value = false
}
</script>

<template>
  <div class="flex flex-col gap-8 flex-1 h-full">
    
    <!-- Vault Header -->
    <div class="flex items-center justify-between border-b border-[#27272A] pb-4">
      <div class="text-xl font-bold font-mono tracking-widest text-[#a1a1aa] flex items-center gap-3">
        // SECURE VAULT
      </div>
      <el-button type="primary" class="font-technical tracking-wide" @click="isModalOpen = true">
        + ADD CREDENTIAL
      </el-button>
    </div>

    <!-- Vault Status Banner -->
    <div class="bg-[rgba(46,204,113,0.05)] border border-[var(--color-brand-success)] rounded p-3 flex items-center gap-3">
      <el-icon color="#2ECC71"><Lock /></el-icon>
      <div class="text-xs font-technical text-[var(--color-brand-success)] uppercase tracking-wider font-medium">
        VAULT UNLOCKED – AES-256-GCM – 28 credentials – Last sync: 09:41:03
      </div>
    </div>

    <!-- Credential Grid -->
    <div class="grid grid-cols-2 gap-6 pb-8">
      
      <div v-for="group in credentialGroups" :key="group.name" class="flex flex-col gap-3">
        
        <div class="flex items-center justify-between px-2 text-zinc-500 font-technical text-xs uppercase tracking-widest font-bold mb-1">
          <div class="flex items-center gap-2">
            <el-icon><component :is="group.icon" /></el-icon>
            {{ group.name }}
          </div>
          <span class="text-[var(--color-brand-accent)]">{{ group.entries.length }} entries</span>
        </div>
        
        <div class="bg-[#232326] border border-[#27272A] rounded overflow-hidden">
          <div 
            v-for="(entry, index) in group.entries" 
            :key="index"
            class="p-4 flex items-center justify-between border-b border-[#27272A] last:border-0 hover:bg-[rgba(255,255,255,0.02)] transition-colors group"
          >
            <div>
              <div class="text-sm font-bold text-zinc-300 mb-1">{{ entry.name }}</div>
              <div class="text-[10px] text-zinc-600 font-technical">{{ entry.user }}</div>
            </div>
            
            <div class="flex items-center gap-4">
              <div class="text-[10px] text-zinc-500 tracking-[0.2em] font-mono select-none">••••••••</div>
              <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <el-button size="small" circle plain class="!bg-transparent !border-zinc-700 !text-zinc-400 hover:!text-white">
                  <el-icon><DocumentCopy /></el-icon>
                </el-button>
                <el-button size="small" circle plain class="!bg-transparent !border-zinc-700 !text-zinc-400 hover:!text-white">
                  <el-icon><Edit /></el-icon>
                </el-button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>

    <!-- Add Credential Modal -->
    <el-dialog v-model="isModalOpen" title="// ADD NEW CREDENTIAL" width="500px" class="custom-dialog font-technical">
      <div class="flex flex-col gap-5">
        
        <div>
          <label class="block text-xs text-zinc-500 mb-2 uppercase tracking-wide">Service URL</label>
          <el-input v-model="newCredentialForm.serviceUrl" placeholder="https://" class="!bg-transparent font-mono text-sm" />
        </div>
        
        <div>
          <label class="block text-xs text-zinc-500 mb-2 uppercase tracking-wide">Username / Email</label>
          <el-input v-model="newCredentialForm.username" class="!bg-transparent font-mono text-sm" />
        </div>
        
        <div>
          <label class="block text-xs text-zinc-500 mb-2 uppercase tracking-wide">Encrypted Password</label>
          <el-input 
            v-model="newCredentialForm.password" 
            type="password" 
            show-password 
            class="!bg-[rgba(255,255,255,0.02)]" 
          />
        </div>
        
        <div>
          <div class="flex justify-between items-center mb-2">
            <label class="block text-xs text-zinc-500 uppercase tracking-wide">Generate 2FA Secret (TOTP)</label>
          </div>
          <div class="flex gap-2">
            <el-input v-model="newCredentialForm.totpSecret" placeholder="Base32 Secret" class="font-mono text-xs flex-1" />
            <el-button plain class="!bg-transparent !border-zinc-700 !text-zinc-400 text-xs font-technical w-28 shrink-0">
              <el-icon class="mr-1"><RefreshRight /></el-icon> Generate
            </el-button>
          </div>
          <p class="text-[10px] text-zinc-600 mt-2 font-technical italic">Used by Playwright to auto-generate 2FA tokens during login.</p>
        </div>

        <div class="pt-2 border-t border-[#3f3f46]">
          <label class="block text-xs text-zinc-500 mb-2 uppercase tracking-wide mt-2">Credential Group</label>
          <el-select v-model="newCredentialForm.group" class="w-full">
            <el-option label="AUTOMATION ACCOUNTS" value="AUTOMATION ACCOUNTS" />
            <el-option label="API KEYS" value="API KEYS" />
            <el-option label="DATABASES" value="DATABASES" />
          </el-select>
        </div>
        
      </div>
      
      <template #footer>
        <div class="flex justify-end gap-3 font-technical">
          <el-button @click="isModalOpen = false" plain class="!bg-transparent !border-zinc-700 !text-zinc-400">Cancel</el-button>
          <el-button type="primary" @click="handleAddCredential">Save & Encrypt</el-button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>
