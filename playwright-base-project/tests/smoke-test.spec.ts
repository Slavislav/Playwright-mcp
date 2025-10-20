import { test, expect } from '@playwright/test';

/**
 * Smoke Test - Framework Validation
 * Verifies that Playwright framework is properly configured
 */
test.describe('Smoke Test - Framework Validation @smoke', () => {
  
  test('should verify Playwright is configured correctly', async ({ page }) => {
    // Test Step 1: Verify page object is available
    await test.step('Verify page object exists', async () => {
      expect(page).toBeDefined();
    });

    // Test Step 2: Verify navigation works
    await test.step('Verify basic navigation', async () => {
      await page.goto('https://playwright.dev');
      await expect(page).toHaveURL(/playwright/);
    });

    // Test Step 3: Verify basic interactions
    await test.step('Verify page title can be read', async () => {
      const title = await page.title();
      expect(title).toBeTruthy();
    });
  });

  test('should verify test data files are accessible', async () => {
    // Test Step 1: Import test data with require (static)
    await test.step('Import and verify credentials data', async () => {
      const credentials = require('../test-data/loox-credentials.json');
      expect(credentials.shopifyAdmin).toBeDefined();
      expect(credentials.shopifyAdmin.username).toBe('slavastinov@gmail.com');
    });

    // Test Step 2: Import test data
    await test.step('Import and verify test data', async () => {
      const testData = require('../test-data/loox-test-data.json');
      expect(testData.emailSettings).toBeDefined();
      expect(testData.orderSearch).toBeDefined();
      expect(testData.branding).toBeDefined();
    });
  });

  test('should verify page objects can be instantiated', async ({ page }) => {
    // Test Step 1: Import page objects
    await test.step('Import EmailSettingsPage', async () => {
      const { EmailSettingsPage } = require('../page-objects/Loox/EmailSettingsPage');
      const emailPage = new EmailSettingsPage(page);
      expect(emailPage).toBeDefined();
      expect(emailPage.page).toBe(page);
    });

    // Test Step 2: Import OrdersPage
    await test.step('Import OrdersPage', async () => {
      const { OrdersPage } = require('../page-objects/Loox/OrdersPage');
      const ordersPage = new OrdersPage(page);
      expect(ordersPage).toBeDefined();
      expect(ordersPage.page).toBe(page);
    });

    // Test Step 3: Import BrandingPage
    await test.step('Import BrandingPage', async () => {
      const { BrandingPage } = require('../page-objects/Loox/BrandingPage');
      const brandingPage = new BrandingPage(page);
      expect(brandingPage).toBeDefined();
      expect(brandingPage.page).toBe(page);
    });
  });

  test('should verify helper functions are available', async () => {
    // Test Step 1: Import auth helper
    await test.step('Import AuthHelper', async () => {
      const { AuthHelper } = require('../helpers/auth-helper');
      expect(AuthHelper).toBeDefined();
      expect(AuthHelper.isAuthenticated).toBeDefined();
      expect(AuthHelper.waitForPageReady).toBeDefined();
    });

    // Test Step 2: Verify static methods exist
    await test.step('Verify AuthHelper methods are functions', async () => {
      const { AuthHelper } = require('../helpers/auth-helper');
      expect(typeof AuthHelper.isAuthenticated).toBe('function');
      expect(typeof AuthHelper.waitForPageReady).toBe('function');
      expect(typeof AuthHelper.navigateWithRetry).toBe('function');
    });
  });
});

