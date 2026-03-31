export interface AutomationTask {
  id: string;
  name: string;
  status: 'Idle' | 'Running' | 'Failed';
  headedMode: boolean;
  lastRun?: string;
}

export interface EmailMessage {
  id: string;
  sender: string;
  subject: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  date: string;
}

export interface VaultCredential {
  id: string;
  target: string;
  username: string;
  encryptedPassword?: string;
}
