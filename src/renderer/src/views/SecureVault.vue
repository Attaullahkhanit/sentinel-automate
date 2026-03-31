<script setup lang="ts">
import { ref } from 'vue'
import {
  ShieldCheck,
  Plus,
  Lock,
  Database,
  KeyRound,
  TerminalSquare,
  Eye,
  EyeOff,
  Copy,
  PenLine,
  X
} from 'lucide-vue-next'

const addModalVisible = ref(false)

const newCred = ref({
  serviceUrl: '',
  username: '',
  password: '',
  totp: '',
  group: 'AUTOMATION ACCOUNTS'
})

const groups = ['AUTOMATION ACCOUNTS', 'API KEYS', 'DATABASES', 'SSH KEYS']
const showPassword = ref(false)

const mockVault = {
  automation: [
    { id: '1', name: 'LinkedIn Scraper', detail: 'scraper@sentinel.io' },
    { id: '2', name: 'AWS Console', detail: 'admin@sentinel-corp.de' },
    { id: '3', name: 'IMAP Outreach', detail: 'outreach@sentinel-corp.de' }
  ],
  apiKeys: [
    { id: '4', name: 'OpenAI API', detail: 'sk-proj-................' },
    { id: '5', name: 'SendGrid', detail: 'SG.....................' },
    { id: '6', name: 'Stripe Webhook', detail: 'whsec_...............' }
  ],
  databases: [
    { id: '7', name: 'Postgres Prod', detail: 'db-prod.sentinel.internal:5432' },
    { id: '8', name: 'Redis Cache', detail: 'redis.sentinel.internal:6379' }
  ],
  sshKeys: [
    { id: '9', name: 'Deploy Server EU', detail: 'deploy@eu-prod-01.sentinel.de' },
    { id: '10', name: 'Staging Env', detail: 'ubuntu@stage.sentinel.io' }
  ]
}

const handleSave = () => {
  addModalVisible.value = false
  // Process save mock
}
</script>

<template>
  <div class="secure-vault-view">
    <!-- HEADER -->
    <div class="vault-header">
      <h2 class="tech-header">// SECURE VAULT</h2>
      <el-button type="primary" class="primary-btn tech-font" @click="addModalVisible = true">
        <Plus :size="14" class="icon-left" /> ADD CREDENTIAL
      </el-button>
    </div>

    <!-- STATUS BAR -->
    <div class="status-bar tech-font text-success">
      <ShieldCheck :size="16" class="icon-left" />
      <span>VAULT UNLOCKED - AES-256-GCM - 28 credentials - Last sync: 09:41:03</span>
    </div>

    <!-- GRID -->
    <div class="vault-grid">
      
      <!-- BLOCK 1: AUTOMATION ACCOUNTS -->
      <div class="vault-category">
        <div class="category-header">
          <div class="cat-title tech-font">
            <Lock :size="14" class="icon-left" /> AUTOMATION ACCOUNTS
          </div>
          <span class="cat-count tech-font text-primary">{{ mockVault.automation.length }} entries</span>
        </div>
        <div class="cred-list">
          <div v-for="cred in mockVault.automation" :key="cred.id" class="cred-item">
            <div class="cred-info">
              <span class="cred-name">{{ cred.name }}</span>
              <span class="cred-detail tech-font text-muted">{{ cred.detail }}</span>
            </div>
            <div class="cred-mask tech-font">••••••••</div>
            <div class="cred-actions">
              <button class="icon-btn" title="Copy"><Copy :size="12" /></button>
              <button class="icon-btn" title="Edit"><PenLine :size="12" /></button>
            </div>
          </div>
        </div>
      </div>

      <!-- BLOCK 2: API KEYS -->
      <div class="vault-category">
        <div class="category-header">
          <div class="cat-title tech-font">
            <KeyRound :size="14" class="icon-left" /> API KEYS
          </div>
          <span class="cat-count tech-font text-primary">{{ mockVault.apiKeys.length }} entries</span>
        </div>
        <div class="cred-list">
          <div v-for="cred in mockVault.apiKeys" :key="cred.id" class="cred-item">
            <div class="cred-info">
              <span class="cred-name">{{ cred.name }}</span>
              <span class="cred-detail tech-font text-muted">{{ cred.detail }}</span>
            </div>
            <div class="cred-actions">
              <button class="icon-btn" title="Copy"><Copy :size="12" /></button>
              <button class="icon-btn" title="Edit"><PenLine :size="12" /></button>
            </div>
          </div>
        </div>
      </div>

      <!-- BLOCK 3: DATABASES -->
      <div class="vault-category">
        <div class="category-header">
          <div class="cat-title tech-font">
            <Database :size="14" class="icon-left" /> DATABASES
          </div>
          <span class="cat-count tech-font text-primary">{{ mockVault.databases.length }} entries</span>
        </div>
        <div class="cred-list">
          <div v-for="cred in mockVault.databases" :key="cred.id" class="cred-item">
            <div class="cred-info">
              <span class="cred-name">{{ cred.name }}</span>
              <span class="cred-detail tech-font text-muted">{{ cred.detail }}</span>
            </div>
            <div class="cred-actions">
              <button class="icon-btn" title="Copy"><Copy :size="12" /></button>
              <button class="icon-btn" title="Edit"><PenLine :size="12" /></button>
            </div>
          </div>
        </div>
      </div>

      <!-- BLOCK 4: SSH KEYS -->
      <div class="vault-category">
        <div class="category-header">
          <div class="cat-title tech-font">
            <TerminalSquare :size="14" class="icon-left" /> SSH KEYS
          </div>
          <span class="cat-count tech-font text-primary">{{ mockVault.sshKeys.length }} entries</span>
        </div>
        <div class="cred-list">
          <div v-for="cred in mockVault.sshKeys" :key="cred.id" class="cred-item">
            <div class="cred-info">
              <span class="cred-name">{{ cred.name }}</span>
              <span class="cred-detail tech-font text-muted">{{ cred.detail }}</span>
            </div>
            <div class="cred-actions">
              <button class="icon-btn" title="Copy"><Copy :size="12" /></button>
              <button class="icon-btn" title="Edit"><PenLine :size="12" /></button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- MODAL (Add Credential) -->
    <el-dialog
      v-model="addModalVisible"
      title="// ADD NEW CREDENTIAL"
      width="480px"
      class="tech-modal"
      :show-close="false"
    >
      <template #header="{ close, titleId }">
        <div class="custom-modal-header">
          <span :id="titleId" class="tech-header text-primary">// ADD NEW CREDENTIAL</span>
          <button class="icon-btn close-btn" @click="close"><X :size="16" /></button>
        </div>
      </template>

      <div class="modal-form">
        <div class="form-group">
          <label class="tech-font">SERVICE URL</label>
          <el-input v-model="newCred.serviceUrl" placeholder="https://example.com/api" class="tech-input" />
        </div>
        
        <div class="form-group">
          <label class="tech-font">USERNAME / EMAIL</label>
          <el-input v-model="newCred.username" placeholder="user@example.com" class="tech-input" />
        </div>
        
        <div class="form-group">
          <label class="tech-font">ENCRYPTED PASSWORD</label>
          <el-input
            v-model="newCred.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••••••"
            class="tech-input password-input"
          >
            <template #append>
              <div class="eye-toggle" @click="showPassword = !showPassword">
                <EyeOff v-if="!showPassword" :size="14" />
                <Eye v-else :size="14" />
              </div>
            </template>
          </el-input>
        </div>
        
        <div class="form-group">
          <label class="tech-font">GENERATE 2FA SECRET (TOTP)</label>
          <el-input v-model="newCred.totp" placeholder="JBSWY3DPFHPK3PXP (Base32)" class="tech-input with-button">
            <template #append>
              <el-button class="tech-font">↻ Generate</el-button>
            </template>
          </el-input>
        </div>
        
        <div class="form-group">
          <label class="tech-font">CREDENTIAL GROUP</label>
          <el-select v-model="newCred.group" class="tech-select w-100" popper-class="tech-popper">
            <el-option v-for="grp in groups" :key="grp" :label="grp" :value="grp" />
          </el-select>
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addModalVisible = false" class="outline-btn tech-font">Cancel</el-button>
          <el-button type="primary" @click="handleSave" class="primary-btn tech-font">
            Save & Encrypt
          </el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<style scoped lang="scss">
.secure-vault-view {
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

.icon-left { margin-right: 6px; }

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

/* Header */
.vault-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1rem;
}

/* Status Bar */
.status-bar {
  display: flex;
  align-items: center;
  border: 1px solid rgba(16, 185, 129, 0.2);
  background-color: rgba(16, 185, 129, 0.05);
  padding: 12px 16px;
  border-radius: 4px;
  font-weight: 600;
}

/* Grid */
.vault-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  .vault-category {
    border: 1px solid var(--border-color);
    background-color: var(--bg-surface);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    
    .category-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid var(--border-color);
      background-color: var(--bg-surface-light);
      
      .cat-title {
        display: flex;
        align-items: center;
        color: var(--text-secondary);
      }
      
      .cat-count {
        font-weight: 700;
      }
    }
  }
}

.cred-list {
  display: flex;
  flex-direction: column;
  
  .cred-item {
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid var(--border-color);
    transition: background-color 0.2s;
    
    &:last-child {
      border-bottom: none;
    }
    
    &:hover {
      background-color: var(--bg-surface-light);
    }
    
    .cred-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
      
      .cred-name {
        font-weight: 600;
        color: var(--text-primary);
      }
    }
    
    .cred-mask {
      color: var(--text-muted);
      margin: 0 16px;
      letter-spacing: 2px;
    }
    
    .cred-actions {
      display: flex;
      gap: 6px;
      
      .icon-btn {
        background: transparent;
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        width: 28px;
        height: 28px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
        
        &:hover {
          border-color: var(--text-primary);
          color: var(--text-primary);
          background-color: var(--bg-main);
        }
      }
    }
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
}

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
  
  .el-input-group__append {
    background-color: var(--bg-surface-light);
    border: 1px solid var(--border-color);
    border-left: none;
    color: var(--text-primary);
    box-shadow: none !important;
    
    .el-button {
        color: var(--text-primary);
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

.eye-toggle {
  cursor: pointer;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 10px;
  
  &:hover {
    color: var(--text-primary);
  }
}

.w-100 { width: 100%; }
</style>
