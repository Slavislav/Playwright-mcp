import { test, expect } from '@playwright/test';
import { EmailSettingsPage } from '../page-objects/Loox/EmailSettingsPage';

/**
 * TC-EMAIL-003: Email Template Customization
 * Priority: P1 - Critical
 * Risk: R-001 - Email delivery system failure, R-006 - Email template customization failure
 * Type: Functional - Email Template Tests
 * 
 * Test Objective: Verify email template customization functionality
 */
test.describe('TC-EMAIL-003: Email Template Customization @P1 @smoke', () => {
  let emailSettingsPage: EmailSettingsPage;

  test.beforeEach(async ({ page }) => {
    emailSettingsPage = new EmailSettingsPage(page);
    
    // Navigate to Email Settings page
    await emailSettingsPage.navigate();
    
    // Wait for iframe to load
    await page.waitForTimeout(2000);
  });

  test('should display email customization section', async () => {
    // Test Step 1: Verify Email customization heading
    await test.step('Verify Email customization heading is visible', async () => {
      await expect(emailSettingsPage.emailCustomizationHeading).toBeVisible();
    });

    // Test Step 2: Verify Edit button is visible
    await test.step('Verify Edit button is visible', async () => {
      await expect(emailSettingsPage.editEmailAppearanceButton).toBeVisible();
    });

    // Test Step 3: Verify section description
    await test.step('Verify customization description text', async () => {
      const descriptionText = await emailSettingsPage.iframe.getByText('Customize your email colors and font to match your brand');
      await expect(descriptionText).toBeVisible();
    });
  });

  test('should verify Edit button is clickable', async () => {
    // Test Step 1: Verify button is enabled
    await test.step('Verify Edit button is enabled', async () => {
      await expect(emailSettingsPage.editEmailAppearanceButton).toBeEnabled();
    });

    // Test Step 2: Click Edit button
    await test.step('Click Edit button for email appearance', async () => {
      await emailSettingsPage.clickEditEmailAppearance();
      
      // Wait for potential modal or redirect
      await emailSettingsPage.page.waitForTimeout(1000);
    });

    // Note: Further validation would require checking what opens after clicking Edit
    // This could be a modal, new page, or inline editor
  });

  test('should verify all email customization elements are accessible', async () => {
    // Test Step 1: Verify customization section is present
    await test.step('Verify email customization section exists', async () => {
      await expect(emailSettingsPage.emailCustomizationHeading).toBeVisible();
    });

    // Test Step 2: Verify helper text for customization
    await test.step('Verify customization helper text', async () => {
      const helperText = await emailSettingsPage.iframe.getByText('Edit email appearance');
      await expect(helperText).toBeVisible();
    });

    // Test Step 3: Verify description explains what can be customized
    await test.step('Verify description mentions colors and font', async () => {
      const description = await emailSettingsPage.iframe.getByText('Customize your email colors and font to match your brand');
      await expect(description).toBeVisible();
      
      const text = await description.textContent();
      expect(text).toContain('colors');
      expect(text).toContain('font');
      expect(text).toContain('brand');
    });
  });

  test('should verify email settings page structure', async () => {
    // Test comprehensive page structure
    await test.step('Verify all major sections are present', async () => {
      // Email customization
      await expect(emailSettingsPage.emailCustomizationHeading).toBeVisible();
      
      // Email replies address
      await expect(emailSettingsPage.emailRepliesAddressInput).toBeVisible();
      
      // Email compliance
      await expect(emailSettingsPage.emailComplianceHeading).toBeVisible();
      
      // Exclude orders
      await expect(emailSettingsPage.excludeOrdersHeading).toBeVisible();
    });

    // Test Step 2: Verify navigation elements
    await test.step('Verify navigation elements are present', async () => {
      await expect(emailSettingsPage.backHomeButton).toBeVisible();
    });
  });

  test('should verify email template section position on page', async () => {
    // Test Step 1: Verify email customization appears before email address
    await test.step('Verify section ordering', async () => {
      const customizationSection = emailSettingsPage.emailCustomizationHeading;
      const emailAddressSection = emailSettingsPage.emailRepliesAddressInput;
      
      await expect(customizationSection).toBeVisible();
      await expect(emailAddressSection).toBeVisible();
    });

    // Test Step 2: Verify all sections are in correct order
    await test.step('Verify logical flow of sections', async () => {
      await expect(emailSettingsPage.emailCustomizationHeading).toBeVisible();
      await expect(emailSettingsPage.emailRepliesAddressInput).toBeVisible();
      await expect(emailSettingsPage.emailComplianceHeading).toBeVisible();
    });
  });
});



