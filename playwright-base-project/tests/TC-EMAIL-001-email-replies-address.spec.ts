import { test, expect } from '@playwright/test';
import { EmailSettingsPage } from '../page-objects/Loox/EmailSettingsPage';
import credentials from '../test-data/loox-credentials.json';
import testData from '../test-data/loox-test-data.json';

/**
 * TC-EMAIL-001: Email Replies Address Configuration
 * Priority: P1 - Critical
 * Risk: R-001 - Email delivery system failure
 * Type: Functional - Positive and Negative Tests
 * 
 * Test Objective: Verify email replies address configuration functionality
 */
test.describe('TC-EMAIL-001: Email Replies Address Configuration @P1 @smoke', () => {
  let emailSettingsPage: EmailSettingsPage;

  test.beforeEach(async ({ page }) => {
    emailSettingsPage = new EmailSettingsPage(page);
    
    // Navigate to Email Settings page
    await emailSettingsPage.navigate();
    
    // Wait for iframe to load
    await page.waitForTimeout(2000);
  });

  test('should display current email replies address correctly', async () => {
    // Test Step 1: Verify current email address
    await test.step('Verify current email replies address displays', async () => {
      const currentEmail = await emailSettingsPage.getEmailRepliesAddress();
      expect(currentEmail).toBe(testData.emailSettings.currentEmail);
    });

    // Test Step 2: Verify helper text is visible
    await test.step('Verify helper text is displayed', async () => {
      await expect(emailSettingsPage.emailRepliesAddressHelperText).toBeVisible();
      const helperText = await emailSettingsPage.emailRepliesAddressHelperText.textContent();
      expect(helperText).toContain('jack@loox.io');
    });
  });

  test('should accept valid email format', async () => {
    // Test Step 1: Clear current email
    await test.step('Clear email address field', async () => {
      await emailSettingsPage.clearEmailRepliesAddress();
      const clearedValue = await emailSettingsPage.getEmailRepliesAddress();
      expect(clearedValue).toBe('');
    });

    // Test Step 2: Enter valid email
    await test.step('Enter valid email format', async () => {
      const validEmail = testData.emailSettings.validEmails[1]; // test@example.com
      await emailSettingsPage.setEmailRepliesAddress(validEmail);
      
      const newValue = await emailSettingsPage.getEmailRepliesAddress();
      expect(newValue).toBe(validEmail);
    });

    // Test Step 3: Verify field accepts the email
    await test.step('Verify email is retained in field', async () => {
      const currentValue = await emailSettingsPage.getEmailRepliesAddress();
      expect(currentValue).toBe(testData.emailSettings.validEmails[1]);
    });
  });

  test('should validate multiple valid email formats', async () => {
    for (const validEmail of testData.emailSettings.validEmails) {
      await test.step(`Test valid email: ${validEmail}`, async () => {
        await emailSettingsPage.setEmailRepliesAddress(validEmail);
        const setValue = await emailSettingsPage.getEmailRepliesAddress();
        expect(setValue).toBe(validEmail);
      });
    }
  });

  test('should handle invalid email formats appropriately', async () => {
    // Note: Since this is an iframe application, HTML5 validation might apply
    // We test that invalid emails can be entered (validation might happen on save)
    for (const invalidEmail of testData.emailSettings.invalidEmails) {
      await test.step(`Test invalid email: ${invalidEmail}`, async () => {
        await emailSettingsPage.setEmailRepliesAddress(invalidEmail);
        const setValue = await emailSettingsPage.getEmailRepliesAddress();
        // Verify the field accepts the input (validation may occur on form submission)
        expect(setValue).toBe(invalidEmail);
      });
    }
  });

  test('should allow clearing email address field', async () => {
    // Test Step 1: Verify email has a value
    await test.step('Verify initial email address exists', async () => {
      const initialEmail = await emailSettingsPage.getEmailRepliesAddress();
      expect(initialEmail).toBeTruthy();
    });

    // Test Step 2: Clear the field
    await test.step('Clear email address field', async () => {
      await emailSettingsPage.clearEmailRepliesAddress();
    });

    // Test Step 3: Verify field is empty
    await test.step('Verify field is cleared', async () => {
      const clearedValue = await emailSettingsPage.getEmailRepliesAddress();
      expect(clearedValue).toBe('');
    });

    // Test Step 4: Verify helper text still displays
    await test.step('Verify helper text still visible after clearing', async () => {
      await expect(emailSettingsPage.emailRepliesAddressHelperText).toBeVisible();
    });
  });

  test('should restore original email address after test', async () => {
    // Test Step 1: Change to different email
    await test.step('Change email to test value', async () => {
      await emailSettingsPage.setEmailRepliesAddress('temporary@test.com');
      const tempValue = await emailSettingsPage.getEmailRepliesAddress();
      expect(tempValue).toBe('temporary@test.com');
    });

    // Test Step 2: Restore original email
    await test.step('Restore original email address', async () => {
      await emailSettingsPage.setEmailRepliesAddress(testData.emailSettings.currentEmail);
      const restoredValue = await emailSettingsPage.getEmailRepliesAddress();
      expect(restoredValue).toBe(testData.emailSettings.currentEmail);
    });
  });

  test.afterEach(async () => {
    // Ensure we don't leave the field in an invalid state
    // Restore original email if needed
    const currentEmail = await emailSettingsPage.getEmailRepliesAddress();
    if (currentEmail !== testData.emailSettings.currentEmail && currentEmail !== '') {
      await emailSettingsPage.setEmailRepliesAddress(testData.emailSettings.currentEmail);
    }
  });
});



