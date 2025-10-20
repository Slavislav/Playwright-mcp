import { test, expect } from '@playwright/test';
import { EmailSettingsPage } from '../page-objects/Loox/EmailSettingsPage';
import { OrdersPage } from '../page-objects/Loox/OrdersPage';
import { BrandingPage } from '../page-objects/Loox/BrandingPage';

/**
 * Demo Test - Page Object Structure Validation
 * These tests verify that page objects are properly structured
 * without requiring actual Loox authentication
 */
test.describe('Demo: Page Object Structure @demo', () => {
  
  test('should verify EmailSettingsPage structure', async ({ page }) => {
    await test.step('Create EmailSettingsPage instance', async () => {
      const emailPage = new EmailSettingsPage(page);
      expect(emailPage).toBeDefined();
      expect(emailPage.page).toBe(page);
    });

    await test.step('Verify EmailSettingsPage has required elements', async () => {
      const emailPage = new EmailSettingsPage(page);
      
      // Verify methods exist
      expect(typeof emailPage.navigate).toBe('function');
      expect(typeof emailPage.getEmailRepliesAddress).toBe('function');
      expect(typeof emailPage.setEmailRepliesAddress).toBe('function');
      expect(typeof emailPage.selectUnsubscribeFromLooxAndShopify).toBe('function');
      expect(typeof emailPage.isUnsubscribeFromLooxAndShopifySelected).toBe('function');
    });

    await test.step('Verify EmailSettingsPage locators are defined', async () => {
      const emailPage = new EmailSettingsPage(page);
      
      // Verify locators exist
      expect(emailPage.emailRepliesAddressInput).toBeDefined();
      expect(emailPage.unsubscribeFromLooxAndShopifyRadio).toBeDefined();
      expect(emailPage.customersWithMarketingConsentAndUSRadio).toBeDefined();
      expect(emailPage.sendTransactionalEmailsCheckbox).toBeDefined();
    });
  });

  test('should verify OrdersPage structure', async ({ page }) => {
    await test.step('Create OrdersPage instance', async () => {
      const ordersPage = new OrdersPage(page);
      expect(ordersPage).toBeDefined();
      expect(ordersPage.page).toBe(page);
    });

    await test.step('Verify OrdersPage has required methods', async () => {
      const ordersPage = new OrdersPage(page);
      
      // Verify methods exist
      expect(typeof ordersPage.navigate).toBe('function');
      expect(typeof ordersPage.searchByEmail).toBe('function');
      expect(typeof ordersPage.selectStatusFilter).toBe('function');
      expect(typeof ordersPage.selectTimeRange).toBe('function');
      expect(typeof ordersPage.clickSearch).toBe('function');
      expect(typeof ordersPage.performSearch).toBe('function');
    });

    await test.step('Verify OrdersPage locators are defined', async () => {
      const ordersPage = new OrdersPage(page);
      
      // Verify locators exist
      expect(ordersPage.searchInput).toBeDefined();
      expect(ordersPage.statusFilterDropdown).toBeDefined();
      expect(ordersPage.timeRangeDropdown).toBeDefined();
      expect(ordersPage.searchButton).toBeDefined();
    });
  });

  test('should verify BrandingPage structure', async ({ page }) => {
    await test.step('Create BrandingPage instance', async () => {
      const brandingPage = new BrandingPage(page);
      expect(brandingPage).toBeDefined();
      expect(brandingPage.page).toBe(page);
    });

    await test.step('Verify BrandingPage has required methods', async () => {
      const brandingPage = new BrandingPage(page);
      
      // Verify methods exist
      expect(typeof brandingPage.navigate).toBe('function');
      expect(typeof brandingPage.uploadLogo).toBe('function');
      expect(typeof brandingPage.getStarRatingColor).toBe('function');
      expect(typeof brandingPage.setStarRatingColor).toBe('function');
      expect(typeof brandingPage.isRoundedSelected).toBe('function');
      expect(typeof brandingPage.selectRounded).toBe('function');
    });

    await test.step('Verify BrandingPage locators are defined', async () => {
      const brandingPage = new BrandingPage(page);
      
      // Verify locators exist
      expect(brandingPage.chooseFileButton).toBeDefined();
      expect(brandingPage.starRatingColorInput).toBeDefined();
      expect(brandingPage.roundedCheckbox).toBeDefined();
      expect(brandingPage.hideLooxBrandingCheckbox).toBeDefined();
    });
  });

  test('should verify all page objects have iframe handling', async ({ page }) => {
    await test.step('Verify EmailSettingsPage uses iframe', async () => {
      const emailPage = new EmailSettingsPage(page);
      expect(emailPage.iframe).toBeDefined();
    });

    await test.step('Verify OrdersPage uses nested iframes', async () => {
      const ordersPage = new OrdersPage(page);
      expect(ordersPage.iframe).toBeDefined();
      expect(ordersPage.ordersFrame).toBeDefined();
    });

    await test.step('Verify BrandingPage uses iframe', async () => {
      const brandingPage = new BrandingPage(page);
      expect(brandingPage.iframe).toBeDefined();
    });
  });

  test('should verify test data is properly structured', async () => {
    await test.step('Load and verify credentials data', async () => {
      const credentials = require('../test-data/loox-credentials.json');
      
      expect(credentials.shopifyAdmin).toBeDefined();
      expect(credentials.shopifyAdmin.username).toBe('slavastinov@gmail.com');
      expect(credentials.shopifyAdmin.password).toBeDefined();
      
      expect(credentials.looxApp).toBeDefined();
      expect(credentials.looxApp.baseUrl).toContain('loox-qa4');
      expect(credentials.looxApp.merchantId).toBe('owRpA393na');
    });

    await test.step('Load and verify email settings test data', async () => {
      const testData = require('../test-data/loox-test-data.json');
      
      expect(testData.emailSettings).toBeDefined();
      expect(testData.emailSettings.validEmails).toBeInstanceOf(Array);
      expect(testData.emailSettings.invalidEmails).toBeInstanceOf(Array);
      expect(testData.emailSettings.currentEmail).toBe('slavastinov@gmail.com');
    });

    await test.step('Load and verify order search test data', async () => {
      const testData = require('../test-data/loox-test-data.json');
      
      expect(testData.orderSearch).toBeDefined();
      expect(testData.orderSearch.expectedOrder).toBeDefined();
      expect(testData.orderSearch.expectedOrder.email).toBe('aaa@abv.bg');
      expect(testData.orderSearch.expectedOrder.product).toContain('Snowboard');
    });

    await test.step('Load and verify branding test data', async () => {
      const testData = require('../test-data/loox-test-data.json');
      
      expect(testData.branding).toBeDefined();
      expect(testData.branding.validFileTypes).toContain('JPG');
      expect(testData.branding.validFileTypes).toContain('PNG');
      expect(testData.branding.maxFileSize).toBe('15 MB');
      expect(testData.branding.validColors).toContain('#EBBF20');
    });
  });

  test('should verify test data validation rules', async () => {
    const testData = require('../test-data/loox-test-data.json');

    await test.step('Verify email validation data', async () => {
      // Valid emails should have @ and domain
      testData.emailSettings.validEmails.forEach((email: string) => {
        expect(email).toContain('@');
        expect(email.split('@')[1]).toContain('.');
      });

      // Invalid emails should fail basic checks
      testData.emailSettings.invalidEmails.forEach((invalid: string) => {
        const isInvalid = !invalid.includes('@') || 
                         invalid.startsWith('@') || 
                         invalid.endsWith('@') ||
                         invalid.includes('..');
        expect(isInvalid).toBe(true);
      });
    });

    await test.step('Verify color validation data', async () => {
      // Valid colors should be hex format
      testData.branding.validColors.forEach((color: string) => {
        expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      });

      // Invalid colors should not be hex format
      testData.branding.invalidColors.forEach((invalid: string) => {
        const isInvalidFormat = !invalid.match(/^#[0-9A-Fa-f]{6}$/);
        expect(isInvalidFormat).toBe(true);
      });
    });

    await test.step('Verify file type validation data', async () => {
      const validTypes = testData.branding.validFileTypes;
      expect(validTypes).toContain('JPG');
      expect(validTypes).toContain('PNG');
      expect(validTypes).toContain('GIF');
      expect(validTypes.length).toBeGreaterThan(0);

      const invalidTypes = testData.branding.invalidFileTypes;
      expect(invalidTypes).toContain('txt');
      expect(invalidTypes).toContain('pdf');
    });
  });
});



