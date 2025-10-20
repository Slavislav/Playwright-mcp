import { Page } from '@playwright/test';

/**
 * Authentication helper for Loox QA4 application
 * Handles Shopify login if needed
 */
export class AuthHelper {
  /**
   * Check if already authenticated to Shopify
   */
  static async isAuthenticated(page: Page): Promise<boolean> {
    try {
      // Check if we're already on a Loox page
      const url = page.url();
      if (url.includes('loox-qa4') || url.includes('istqb5-qa4')) {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Wait for page to be ready after navigation
   * Useful for iframe-heavy applications
   */
  static async waitForPageReady(page: Page, timeout: number = 3000) {
    await page.waitForTimeout(timeout);
  }

  /**
   * Navigate with retry logic
   */
  static async navigateWithRetry(page: Page, url: string, retries: number = 3): Promise<boolean> {
    for (let i = 0; i < retries; i++) {
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await this.waitForPageReady(page);
        return true;
      } catch (error) {
        console.log(`Navigation attempt ${i + 1} failed, retrying...`);
        if (i === retries - 1) {
          throw error;
        }
        await page.waitForTimeout(2000);
      }
    }
    return false;
  }
}



