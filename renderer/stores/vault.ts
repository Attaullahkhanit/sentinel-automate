import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVaultStore = defineStore('vault', () => {
  const credentialGroups = ref([
    {
      name: 'AUTOMATION ACCOUNTS',
      icon: 'User',
      entries: [
        { name: 'LinkedIn Scraper', user: 'scraper@sentinel.io', type: 'password' },
        { name: 'AWS Console', user: 'admin@sentinel-corp.de', type: 'password' },
        { name: 'IMAP Outreach', user: 'outreach@sentinel-corp.de', type: 'password' },
      ]
    },
    {
      name: 'API KEYS',
      icon: 'Key',
      entries: [
        { name: 'OpenAI API', user: 'sk-proj-...', type: 'api_key' },
        { name: 'SendGrid', user: 'SG...', type: 'api_key' },
        { name: 'Stripe Webhook', user: 'whsec_...', type: 'api_key' },
      ]
    },
    {
      name: 'DATABASES',
      icon: 'Coin',
      entries: [
        { name: 'Postgres Prod', user: 'db-prod.sentinel.internal:5432', type: 'password' },
        { name: 'Redis Cache', user: 'redis.sentinel.internal:6379', type: 'password' },
      ]
    },
    {
      name: 'SSH KEYS',
      icon: 'Monitor',
      entries: [
        { name: 'Deploy Server EU', user: 'deploy@eu-prod-01.sentinel.de', type: 'ssh' },
        { name: 'Staging Env', user: 'ubuntu@stage.sentinel.io', type: 'ssh' },
      ]
    }
  ])

  function addCredential(newCredential: any) {
    const group = credentialGroups.value.find(g => g.name === newCredential.group)
    if (group) {
      group.entries.push({
        name: newCredential.serviceUrl,
        user: newCredential.username,
        type: 'password' // Mocked type
      })
    }
  }

  return { credentialGroups, addCredential }
})
