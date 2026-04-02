import { chromium, Browser, Page } from 'playwright'

export class AutomationService {
  private browser: Browser | null = null

  async runTask(taskId: number, name: string, isHeaded: boolean) {
    console.log(`[AutomationService] Starting task ${taskId}: ${name} (Headed: ${isHeaded})`)
    
    try {
      this.browser = await chromium.launch({
        headless: !isHeaded
      })

      const context = await this.browser.newContext()
      const page = await context.newPage()

      // Proof of Concept Sample Script
      await page.goto('https://github.com/microsoft/playwright')
      await page.waitForTimeout(2000)
      
      const title = await page.title()
      console.log(`[AutomationService] Task ${taskId} Success: ${title}`)
      
      await this.browser.close()
      this.browser = null
      return { success: true, title }
    } catch (error: any) {
      console.error(`[AutomationService] Task ${taskId} Failed:`, error)
      if (this.browser) await this.browser.close()
      this.browser = null
      return { success: false, error: error.message }
    }
  }

  async stopAll() {
    if (this.browser) {
      await this.browser.close()
      this.browser = null
    }
  }
}

export const automationService = new AutomationService()
