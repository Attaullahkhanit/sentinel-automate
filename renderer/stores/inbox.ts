import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useInboxStore = defineStore('inbox', () => {
  const emails = ref([
    { id: 1, sender: 'Michael Scott', subject: 'Re: Enterprise Plan Inquiry', preview: 'We are very interested in moving forward...', date: '10:42 AM', sentiment: 'Positive', unread: true },
    { id: 2, sender: 'System Alert', subject: 'IMAP Sync Failed for Account B', preview: 'The automated sync process encountered an error...', date: '09:15 AM', sentiment: 'Alert', unread: true },
    { id: 3, sender: 'Client Services', subject: 'Missing Payment Details', preview: 'Please provide the missing invoice details as soon as...', date: 'Yesterday', sentiment: 'Action Required', unread: false },
    { id: 4, sender: 'Dwight Schrute', subject: 'Contract Review Update', preview: 'I have attached the updated contract with my revisions.', date: 'Jan 12', sentiment: 'Neutral', unread: false },
  ])

  const selectedEmailId = ref(1)

  return { emails, selectedEmailId }
})
