<script setup lang="ts">
import { ref } from 'vue'
import {
  RotateCcw,
  SquarePen,
  Reply,
  Forward,
  Archive,
  X
} from 'lucide-vue-next'

const selectedEmailId = ref('1')

const mockEmails = [
  {
    id: '1',
    senderName: 'Hans Brücke',
    senderEmail: 'hans@example.de',
    subject: 'Re: Automation demo request',
    date: '09:41',
    fullDate: '09:41 - Jan 14, 2025',
    sentiment: 'POSITIVE',
    body: `Hi team,\n\nThank you for the demo yesterday - the Playwright automation pipeline was exactly what we were looking for. The headed mode toggle is a particularly nice touch for debugging.\n\nWe'd like to proceed with the enterprise tier. Could you send over the SLA documentation and pricing for 10 concurrent browser instances?\n\nBest regards,\nHans`
  },
  {
    id: '2',
    senderName: 'security@sentinel.io',
    senderEmail: 'security@sentinel.io',
    subject: 'ALERT: Failed login attempt',
    date: '08:55',
    fullDate: '08:55 - Jan 14, 2025',
    sentiment: 'ALERT',
    body: `We detected 3 failed login attempts from IP 192.168.1.1.`
  },
  {
    id: '3',
    senderName: 'lisa.mueller@acme.de',
    senderEmail: 'lisa.mueller@acme.de',
    subject: 'Contract renewal — action req...',
    date: '08:12',
    fullDate: '08:12 - Jan 14, 2025',
    sentiment: 'ACTION',
    body: `Please review attached renewal documentation.`
  },
  {
    id: '4',
    senderName: 'cto@partnerfirm.com',
    senderEmail: 'cto@partnerfirm.com',
    subject: 'Integration proposal - playwri...',
    date: 'Yesterday',
    fullDate: '15:20 - Jan 13, 2025',
    sentiment: 'POSITIVE',
    body: `Looking forward to integrating our stacks.`
  },
  {
    id: '5',
    senderName: 'noreply@aws.amazon.com',
    senderEmail: 'noreply@aws.amazon.com',
    subject: 'Billing alert: usage spike',
    date: 'Yesterday',
    fullDate: '11:05 - Jan 13, 2025',
    sentiment: 'ACTION',
    body: `Your AWS usage for the month has exceeded 80% of your threshold.`
  }
]

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case 'POSITIVE': return 'var(--success)'
    case 'ALERT': return 'var(--danger)'
    case 'ACTION': return 'var(--warning)'
    default: return 'var(--text-secondary)'
  }
}
</script>

<template>
  <div class="inbox-view">
    <!-- HEADER -->
    <div class="inbox-header">
      <h2 class="tech-header">// OUTREACH INBOX</h2>
      <div class="header-actions">
        <el-button class="outline-btn tech-font">
          <RotateCcw :size="14" class="icon-left" /> Sync IMAP
        </el-button>
        <el-button type="primary" class="primary-btn tech-font">
          <SquarePen :size="14" class="icon-left" /> Compose
        </el-button>
      </div>
    </div>

    <!-- MAIN SPLIT -->
    <div class="inbox-container">
      <!-- LEFT SIDEBAR -->
      <div class="email-list">
        <div class="list-header tech-font">
          <span class="text-muted">INBOX</span>
          <span class="text-muted">14 NEW</span>
        </div>
        
        <div class="email-items">
          <div
            v-for="email in mockEmails"
            :key="email.id"
            class="email-item"
            :class="{ active: selectedEmailId === email.id }"
            @click="selectedEmailId = email.id"
          >
            <div class="item-top">
              <span class="sender">{{ email.senderName }}</span>
              <span class="time tech-font text-muted">{{ email.date }}</span>
            </div>
            <div class="subject">{{ email.subject }}</div>
            <div
              class="sentiment-tag tech-font"
              :style="{ color: getSentimentColor(email.sentiment), borderColor: getSentimentColor(email.sentiment) }"
            >
              + {{ email.sentiment }}
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT DETAIL PANE -->
      <div class="email-detail">
        <template v-if="selectedEmailId">
          <div class="detail-header" v-for="email in mockEmails.filter(e => e.id === selectedEmailId)" :key="email.id">
            <h3 class="detail-subject">{{ email.subject }}</h3>
            <div class="detail-meta">
              <span class="sender-full">{{ email.senderName }} &lt;{{ email.senderEmail }}&gt;</span>
              <span class="meta-divider">·</span>
              <span class="full-date tech-font text-muted">{{ email.fullDate }}</span>
              <span class="meta-divider">·</span>
            </div>
            
            <div class="detail-body">
              <p v-for="(paragraph, index) in email.body.split('\n')" :key="index">
                {{ paragraph }}
              </p>
            </div>
          </div>
          
          <div class="detail-actions">
            <div class="action-group-left">
              <el-button type="primary" class="reply-btn tech-font">
                <Reply :size="14" class="icon-left" /> Reply
              </el-button>
              <el-button class="outline-btn tech-font">
                <Forward :size="14" class="icon-left" /> Forward
              </el-button>
              <el-button class="outline-btn tech-font">
                <Archive :size="14" class="icon-left" /> Archive
              </el-button>
            </div>
            <el-button class="outline-btn delete-btn tech-font">
              <X :size="14" class="icon-left" /> Delete
            </el-button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.inbox-view {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 5rem);
  gap: 1.5rem;
}

.tech-font {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.5px;
}

.text-muted { color: var(--text-muted); }

/* Header */
.inbox-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1rem;
  
  .header-actions {
    display: flex;
    gap: 12px;
  }
}

.icon-left {
  margin-right: 6px;
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

.primary-btn {
  background-color: var(--primary) !important;
  color: #fff !important;
  border: none !important;
  border-radius: 4px;
  font-weight: 600;
}

.reply-btn {
  background-color: var(--primary) !important;
  color: #fff !important;
  border: none !important;
  border-radius: 4px;
  font-weight: 600;
  padding: 8px 16px;
}

.delete-btn {
  color: var(--danger);
  border-color: rgba(239, 68, 68, 0.3);
  
  &:hover {
    color: var(--danger);
    border-color: var(--danger);
    background-color: rgba(239, 68, 68, 0.1);
  }
}

/* Container */
.inbox-container {
  display: flex;
  flex: 1;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  overflow: hidden;
  background-color: var(--bg-main);
  min-height: 0; // fixes flex overflow
}

/* Sidebar */
.email-list {
  width: 320px;
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  background-color: var(--bg-surface);
  
  .list-header {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
    font-weight: 600;
  }
  
  .email-items {
    flex: 1;
    overflow-y: auto;
    
    .email-item {
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 6px;
      transition: background-color 0.2s;
      
      &:hover {
        background-color: var(--bg-surface-light);
      }
      
      &.active {
        background-color: var(--primary-bg);
        border-left: 2px solid var(--primary);
        padding-left: calc(1rem - 2px);
      }
      
      .item-top {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        
        .sender {
          font-weight: 600;
          color: var(--text-primary);
        }
      }
      
      .subject {
        font-size: 13px;
        color: var(--text-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .sentiment-tag {
        font-size: 9px;
        font-weight: 700;
        border: 1px solid;
        padding: 2px 6px;
        border-radius: 2px;
        width: fit-content;
        background-color: rgba(0,0,0,0.2);
        margin-top: 4px;
      }
    }
  }
}

/* Detail Pane */
.email-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-main);
  padding: 1.5rem;
  
  .detail-header {
    flex: 1;
    display: flex;
    flex-direction: column;
    
    .detail-subject {
      margin: 0 0 1rem 0;
      font-size: 1.25rem;
      color: var(--text-primary);
      font-weight: 600;
      font-family: var(--font-mono);
    }
    
    .detail-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
      
      .sender-full {
        color: var(--text-secondary);
      }
      
      .meta-divider {
        color: var(--text-muted);
      }
    }
    
    .detail-body {
      color: var(--text-primary);
      font-size: 14px;
      line-height: 1.6;
      max-width: 800px;
      
      p {
        margin: 0 0 1rem 0;
        min-height: 1em; /* keeps empty lines */
      }
    }
  }
  
  .detail-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-color);
    margin-top: auto;
    
    .action-group-left {
      display: flex;
      gap: 12px;
    }
  }
}
</style>
