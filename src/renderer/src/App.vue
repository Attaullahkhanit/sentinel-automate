<script setup lang="ts">
import { RouterView } from 'vue-router'
import {
  Menu,
  Mail,
  Shield,
  Settings
} from 'lucide-vue-next'
</script>

<template>
  <el-container class="app-layout">
    <el-aside class="sidebar" width="240px">
      
      <el-menu
        class="nav-menu"
        background-color="transparent"
        text-color="var(--text-secondary)"
        active-text-color="var(--primary)"
        :router="true"
        :default-active="$route.path"
      >
        <el-menu-item index="/">
          <el-icon><Menu :size="16" /></el-icon>
          <span>Automations</span>
        </el-menu-item>
        
        <el-menu-item index="/inbox">
          <el-icon><Mail :size="16" /></el-icon>
          <span>Outreach</span>
        </el-menu-item>
        
        <el-menu-item index="/vault">
          <el-icon><Shield :size="16" /></el-icon>
          <span>Secure Vault</span>
        </el-menu-item>
        
        <el-menu-item index="/settings" class="settings-item">
          <el-icon><Settings :size="16" /></el-icon>
          <span>Settings</span>
        </el-menu-item>
      </el-menu>

      <div class="sidebar-footer">
          <div class="user-profile">
          <div class="avatar">
            <span>AK</span>
          </div>
          <div class="user-info">
            <span class="user-name">Attaullah Khan</span>
            <span class="user-role">ADMIN - PAKISTAN</span>
          </div>
          <div class="status-dot"></div>
        </div>
      </div>

    </el-aside>

    <el-main class="main-content">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </el-main>
  </el-container>
</template>

<style scoped lang="scss">
.app-layout {
  height: 100vh;
  width: 100vw;
  background-color: var(--bg-main);
  color: var(--text-primary);
  font-family: var(--font-sans);

  .sidebar {
    background-color: var(--bg-surface);
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    padding-top: 1.5rem;

    .nav-menu {
      border-right: none;
      flex-grow: 1;

      .el-menu-item {
        font-family: var(--font-mono);
        font-size: 0.85rem;
        font-weight: 500;
        margin: 0.25rem 0.75rem;
        height: 38px;
        line-height: 38px;
        border-radius: 6px;
        transition: all 0.2s ease;

        &:hover {
          background-color: var(--bg-surface-light);
          color: var(--text-primary);
        }

        &.is-active {
          background-color: var(--primary-bg);
          color: #60a5fa; /* light blue */
          border-left: 3px solid var(--primary);
          border-radius: 4px;
        }

        .el-icon {
          margin-right: 12px;
          color: currentColor;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      
      .settings-item {
        margin-top: 1rem;
      }
    }

    .sidebar-footer {
      border-top: 1px solid var(--border-color);
      padding: 1.25rem 1rem;
      margin-top: auto;
      
      .user-profile {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        
        .avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: var(--primary);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
        }
        
        .user-info {
          display: flex;
          flex-direction: column;
          font-family: var(--font-mono);
          
          .user-name {
            font-size: 0.85rem;
            color: var(--text-primary);
            font-weight: 600;
          }
          
          .user-role {
            font-size: 0.65rem;
            color: var(--text-muted);
            letter-spacing: 0.5px;
          }
        }
        
        .status-dot {
          margin-left: auto;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--success);
          box-shadow: 0 0 6px rgba(16, 185, 129, 0.4);
        }
      }
    }
  }

  .main-content {
    background-color: var(--bg-main);
    padding: 2rem 2.5rem;
    overflow-y: auto;
    position: relative;
    box-sizing: border-box;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>
