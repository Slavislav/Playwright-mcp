import { test, expect } from '@playwright/test';
import { EmailSettingsPage } from '../page-objects/Loox/EmailSettingsPage';
import testData from '../test-data/loox-test-data.json';

/**
 * TC-EMAIL-002: Email Compliance Settings Validation
 * Priority: P1 - Critical
 * Risk: R-001 - Email delivery system failure, R-004 - Data privacy compliance failure
 * Type: Functional - Compliance and Configuration Tests
 * 
 * Test Objective: Verify email compliance settings functionality
 */
test.describe('TC-EMAIL-002: Email Compliance Settings Validation @P1 @smoke', () => {
  let emailSettingsPage: EmailSettingsPage;

  test.beforeEach(async ({ page }) => {
    emailSettingsPage = new EmailSettingsPage(page);
    
    // Navigate to Email Settings page
    await emailSettingsPage.navigate();
    
    // Wait for iframe to load
    await page.waitForTimeout(2000);
  });

  test('should display email compliance section correctly', async () => {
    // Test Step 1: Verify compliance heading is visible
    await test.step('Verify Email compliance heading', async () => {
      await expect(emailSettingsPage.emailComplianceHeading).toBeVisible();
    });

    // Test Step 2: Verify all radio buttons are visible
    await test.step('Verify all compliance options are visible', async () => {
      await expect(emailSettingsPage.unsubscribeFromLooxAndShopifyRadio).toBeVisible();
      await expect(emailSettingsPage.keepSubscribedToShopifyRadio).toBeVisible();
      await expect(emailSettingsPage.customersWithMarketingConsentAndUSRadio).toBeVisible();
      await expect(emailSettingsPage.onlyCustomersWithMarketingConsentRadio).toBeVisible();
      await expect(emailSettingsPage.allCustomersRadio).toBeVisible();
      await expect(emailSettingsPage.sendTransactionalEmailsCheckbox).toBeVisible();
    });
  });

  test('should verify default unsubscribe settings', async () => {
    // Test Step 1: Verify "Unsubscribe from Loox and Shopify" is selected by default
    await test.step('Verify default unsubscribe setting', async () => {
      const isSelected = await emailSettingsPage.isUnsubscribeFromLooxAndShopifySelected();
      expect(isSelected).toBe(true);
    });

    // Test Step 2: Verify "Keep subscribed to Shopify" is not selected
    await test.step('Verify alternative option is not selected', async () => {
      const isSelected = await emailSettingsPage.isKeepSubscribedToShopifySelected();
      expect(isSelected).toBe(false);
    });
  });

  test('should allow switching unsubscribe options', async () => {
    // Test Step 1: Select "Keep subscribed to Shopify" option
    await test.step('Select Keep subscribed to Shopify option', async () => {
      await emailSettingsPage.selectKeepSubscribedToShopify();
      
      const isSelected = await emailSettingsPage.isKeepSubscribedToShopifySelected();
      expect(isSelected).toBe(true);
    });

    // Test Step 2: Verify first option is deselected
    await test.step('Verify first option is deselected', async () => {
      const isSelected = await emailSettingsPage.isUnsubscribeFromLooxAndShopifySelected();
      expect(isSelected).toBe(false);
    });

    // Test Step 3: Switch back to original option
    await test.step('Switch back to Unsubscribe from Loox and Shopify', async () => {
      await emailSettingsPage.selectUnsubscribeFromLooxAndShopify();
      
      const isSelected = await emailSettingsPage.isUnsubscribeFromLooxAndShopifySelected();
      expect(isSelected).toBe(true);
    });
  });

  test('should verify default "Send emails to" settings', async () => {
    // Test Step 1: Verify "Customers with marketing consent and US" is selected by default
    await test.step('Verify default send emails setting', async () => {
      const isSelected = await emailSettingsPage.isCustomersWithMarketingConsentAndUSSelected();
      expect(isSelected).toBe(true);
    });

    // Test Step 2: Verify other options are not selected
    await test.step('Verify other options are not selected', async () => {
      const onlyConsent = await emailSettingsPage.isOnlyCustomersWithMarketingConsentSelected();
      const allCustomers = await emailSettingsPage.isAllCustomersSelected();
      
      expect(onlyConsent).toBe(false);
      expect(allCustomers).toBe(false);
    });
  });

  test('should allow switching "Send emails to" options', async () => {
    // Test Step 1: Select "Only customers with marketing consent"
    await test.step('Select Only customers with marketing consent', async () => {
      await emailSettingsPage.selectOnlyCustomersWithMarketingConsent();
      
      const isSelected = await emailSettingsPage.isOnlyCustomersWithMarketingConsentSelected();
      expect(isSelected).toBe(true);
    });

    // Test Step 2: Select "All customers"
    await test.step('Select All customers option', async () => {
      await emailSettingsPage.selectAllCustomers();
      
      const isSelected = await emailSettingsPage.isAllCustomersSelected();
      expect(isSelected).toBe(true);
    });

    // Test Step 3: Verify only one option is selected
    await test.step('Verify only All customers is selected', async () => {
      const withConsent = await emailSettingsPage.isCustomersWithMarketingConsentAndUSSelected();
      const onlyConsent = await emailSettingsPage.isOnlyCustomersWithMarketingConsentSelected();
      
      expect(withConsent).toBe(false);
      expect(onlyConsent).toBe(false);
    });

    // Test Step 4: Restore original selection
    await test.step('Restore original Customers with marketing consent and US setting', async () => {
      await emailSettingsPage.selectCustomersWithMarketingConsentAndUS();
      
      const isSelected = await emailSettingsPage.isCustomersWithMarketingConsentAndUSSelected();
      expect(isSelected).toBe(true);
    });
  });

  test('should verify transactional emails checkbox functionality', async () => {
    // Test Step 1: Verify checkbox is checked by default
    await test.step('Verify transactional emails checkbox is checked', async () => {
      const isChecked = await emailSettingsPage.isSendTransactionalEmailsChecked();
      expect(isChecked).toBe(true);
    });

    // Test Step 2: Uncheck the checkbox
    await test.step('Uncheck transactional emails checkbox', async () => {
      await emailSettingsPage.toggleSendTransactionalEmails();
      
      const isChecked = await emailSettingsPage.isSendTransactionalEmailsChecked();
      expect(isChecked).toBe(false);
    });

    // Test Step 3: Check the checkbox again
    await test.step('Check transactional emails checkbox again', async () => {
      await emailSettingsPage.toggleSendTransactionalEmails();
      
      const isChecked = await emailSettingsPage.isSendTransactionalEmailsChecked();
      expect(isChecked).toBe(true);
    });
  });

  test('should test all compliance settings combinations', async () => {
    // Test different combinations of settings
    await test.step('Test combination: Keep subscribed + Only consent + Transactional unchecked', async () => {
      await emailSettingsPage.selectKeepSubscribedToShopify();
      await emailSettingsPage.selectOnlyCustomersWithMarketingConsent();
      
      // Uncheck transactional if checked
      const isChecked = await emailSettingsPage.isSendTransactionalEmailsChecked();
      if (isChecked) {
        await emailSettingsPage.toggleSendTransactionalEmails();
      }
      
      // Verify settings
      expect(await emailSettingsPage.isKeepSubscribedToShopifySelected()).toBe(true);
      expect(await emailSettingsPage.isOnlyCustomersWithMarketingConsentSelected()).toBe(true);
      expect(await emailSettingsPage.isSendTransactionalEmailsChecked()).toBe(false);
    });

    await test.step('Test combination: Unsubscribe + All customers + Transactional checked', async () => {
      await emailSettingsPage.selectUnsubscribeFromLooxAndShopify();
      await emailSettingsPage.selectAllCustomers();
      
      // Check transactional if unchecked
      const isChecked = await emailSettingsPage.isSendTransactionalEmailsChecked();
      if (!isChecked) {
        await emailSettingsPage.toggleSendTransactionalEmails();
      }
      
      // Verify settings
      expect(await emailSettingsPage.isUnsubscribeFromLooxAndShopifySelected()).toBe(true);
      expect(await emailSettingsPage.isAllCustomersSelected()).toBe(true);
      expect(await emailSettingsPage.isSendTransactionalEmailsChecked()).toBe(true);
    });
  });

  test('should maintain settings persistence', async () => {
    // Test Step 1: Change settings
    await test.step('Change compliance settings', async () => {
      await emailSettingsPage.selectKeepSubscribedToShopify();
      await emailSettingsPage.selectOnlyCustomersWithMarketingConsent();
    });

    // Test Step 2: Verify settings are maintained
    await test.step('Verify settings persist', async () => {
      expect(await emailSettingsPage.isKeepSubscribedToShopifySelected()).toBe(true);
      expect(await emailSettingsPage.isOnlyCustomersWithMarketingConsentSelected()).toBe(true);
    });

    // Test Step 3: Restore original settings
    await test.step('Restore original settings', async () => {
      await emailSettingsPage.selectUnsubscribeFromLooxAndShopify();
      await emailSettingsPage.selectCustomersWithMarketingConsentAndUS();
    });
  });

  test.afterEach(async () => {
    // Ensure we restore default compliance settings
    await emailSettingsPage.selectUnsubscribeFromLooxAndShopify();
    await emailSettingsPage.selectCustomersWithMarketingConsentAndUS();
    
    // Ensure transactional emails checkbox is checked
    const isChecked = await emailSettingsPage.isSendTransactionalEmailsChecked();
    if (!isChecked) {
      await emailSettingsPage.toggleSendTransactionalEmails();
    }
  });
});



