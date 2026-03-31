import { createRouter, createWebHashHistory } from 'vue-router'
import AutomationManager from '../views/AutomationManager.vue'
import OutreachInbox from '../views/OutreachInbox.vue'
import SecureVault from '../views/SecureVault.vue'
import Settings from '../views/Settings.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'AutomationManager',
      component: AutomationManager
    },
    {
      path: '/inbox',
      name: 'OutreachInbox',
      component: OutreachInbox
    },
    {
      path: '/vault',
      name: 'SecureVault',
      component: SecureVault
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }
  ]
})

export default router
