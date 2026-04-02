import { createRouter, createWebHistory } from 'vue-router'
import MasterUnlock from '../views/MasterUnlock.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import DashboardHome from '../views/DashboardHome.vue'
import AutomationsManager from '../views/AutomationsManager.vue'
import OutreachInbox from '../views/OutreachInbox.vue'
import SecureVault from '../views/SecureVault.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/unlock',
      name: 'unlock',
      component: MasterUnlock
    },
    {
      path: '/',
      component: DashboardLayout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardHome
        },
        {
          path: 'automations',
          name: 'automations',
          component: AutomationsManager
        },
        {
          path: 'outreach',
          name: 'outreach',
          component: OutreachInbox
        },
        {
          path: 'vault',
          name: 'vault',
          component: SecureVault
        },
        {
          path: 'settings',
          name: 'settings',
          component: SettingsView
        }
      ]
    }
  ]
})

export default router
