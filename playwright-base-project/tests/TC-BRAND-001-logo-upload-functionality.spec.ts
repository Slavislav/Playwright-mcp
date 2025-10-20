import { test, expect } from '@playwright/test';
import { BrandingPage } from '../page-objects/Loox/BrandingPage';
import testData from '../test-data/loox-test-data.json';
import path from 'path';

/**
 * TC-BRAND-001: Logo Upload Functionality
 * Priority: P2 - High
 * Risk: R-005 - Widget display failure
 * Type: Functional - File Upload and Validation Tests
 * 
 * Test Objective: Verify logo upload functionality and validation
 */
test.describe('TC-BRAND-001: Logo Upload Functionality @P2', () => {
  let brandingPage: BrandingPage;

  test.beforeEach(async ({ page }) => {
    brandingPage = new BrandingPage(page);
    
    // Navigate to Branding page
    await brandingPage.navigate();
    
    // Wait for iframe to load
    await page.waitForTimeout(2000);
  });

  test('should display logo upload section correctly', async () => {
    // Test Step 1: Verify Logo heading
    await test.step('Verify Logo heading is visible', async () => {
      await expect(brandingPage.logoHeading).toBeVisible();
    });

    // Test Step 2: Verify "Choose a file" button
    await test.step('Verify Choose a file button is visible', async () => {
      await expect(brandingPage.chooseFileButton).toBeVisible();
      const isVisible = await brandingPage.isChooseFileButtonVisible();
      expect(isVisible).toBe(true);
    });

    // Test Step 3: Verify helper text displays supported formats
    await test.step('Verify helper text displays file requirements', async () => {
      await expect(brandingPage.logoUploadHelperText).toBeVisible();
      
      const helperText = await brandingPage.logoUploadHelperText.textContent();
      expect(helperText).toContain('JPG');
      expect(helperText).toContain('PNG');
      expect(helperText).toContain('WEBP');
      expect(helperText).toContain('JPEG');
      expect(helperText).toContain('GIF');
      expect(helperText).toContain('15 MB');
    });
  });

  test('should display all supported file types in helper text', async () => {
    // Test Step 1: Get helper text
    await test.step('Verify all supported file types are mentioned', async () => {
      const helperText = await brandingPage.logoUploadHelperText.textContent();
      
      // Verify all valid file types from test data
      for (const fileType of testData.branding.validFileTypes) {
        expect(helperText).toContain(fileType);
      }
    });

    // Test Step 2: Verify file size limit
    await test.step('Verify file size limit is mentioned', async () => {
      const helperText = await brandingPage.logoUploadHelperText.textContent();
      expect(helperText).toContain(testData.branding.maxFileSize);
    });
  });

  test('should verify Choose File button is enabled', async () => {
    // Test Step 1: Verify button is enabled
    await test.step('Verify Choose a file button is enabled', async () => {
      await expect(brandingPage.chooseFileButton).toBeEnabled();
    });

    // Test Step 2: Verify button is clickable
    await test.step('Verify button responds to interaction', async () => {
      // Hover over button to test interaction
      await brandingPage.chooseFileButton.hover();
      await brandingPage.page.waitForTimeout(300);
      
      // Verify button is still visible after interaction
      await expect(brandingPage.chooseFileButton).toBeVisible();
    });
  });

  test('should display style customization section', async () => {
    // Test Step 1: Verify Style heading
    await test.step('Verify Style heading is visible', async () => {
      await expect(brandingPage.styleHeading).toBeVisible();
    });

    // Test Step 2: Verify style description
    await test.step('Verify style description text', async () => {
      await expect(brandingPage.styleDescription).toBeVisible();
      
      const description = await brandingPage.styleDescription.textContent();
      expect(description).toContain('Customize');
      expect(description).toContain('reviews');
      expect(description).toContain('emails');
      expect(description).toContain('widgets');
    });

    // Test Step 3: Verify star rating section
    await test.step('Verify star rating section is visible', async () => {
      await expect(brandingPage.starRatingHeading).toBeVisible();
      await expect(brandingPage.starRatingColorInput).toBeVisible();
    });

    // Test Step 4: Verify corner style section
    await test.step('Verify corner style section is visible', async () => {
      await expect(brandingPage.cornerStyleHeading).toBeVisible();
      await expect(brandingPage.sharpCornerCheckbox).toBeVisible();
      await expect(brandingPage.slightlyRoundedCheckbox).toBeVisible();
      await expect(brandingPage.roundedCheckbox).toBeVisible();
      await expect(brandingPage.extraRoundedCheckbox).toBeVisible();
    });

    // Test Step 5: Verify main font section
    await test.step('Verify main font section is visible', async () => {
      await expect(brandingPage.mainFontHeading).toBeVisible();
      await expect(brandingPage.mainFontDropdown).toBeVisible();
    });
  });

  test('should verify star rating color value', async () => {
    // Test Step 1: Get current star rating color
    await test.step('Verify star rating color displays correctly', async () => {
      const currentColor = await brandingPage.getStarRatingColor();
      
      // Verify it's a valid hex color format
      expect(currentColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });

    // Test Step 2: Verify color can be read
    await test.step('Verify color value can be retrieved', async () => {
      const color = await brandingPage.getStarRatingColor();
      expect(color).toBeTruthy();
      expect(color.length).toBe(7); // #RRGGBB format
    });
  });

  test('should test star rating color customization', async () => {
    const originalColor = await brandingPage.getStarRatingColor();

    // Test Step 1: Test setting valid color
    await test.step('Set valid hex color', async () => {
      const testColor = testData.branding.validColors[0]; // #EBBF20
      await brandingPage.setStarRatingColor(testColor);
      
      const newColor = await brandingPage.getStarRatingColor();
      expect(newColor.toUpperCase()).toBe(testColor.toUpperCase());
    });

    // Test Step 2: Test multiple valid colors
    await test.step('Test multiple valid color values', async () => {
      for (const color of testData.branding.validColors.slice(1, 4)) {
        await brandingPage.setStarRatingColor(color);
        const setColor = await brandingPage.getStarRatingColor();
        expect(setColor.toUpperCase()).toBe(color.toUpperCase());
      }
    });

    // Test Step 3: Restore original color
    await test.step('Restore original color', async () => {
      await brandingPage.setStarRatingColor(originalColor);
      const restoredColor = await brandingPage.getStarRatingColor();
      expect(restoredColor).toBe(originalColor);
    });
  });

  test('should verify corner style options', async () => {
    // Test Step 1: Verify all corner style checkboxes are visible
    await test.step('Verify all corner style options are visible', async () => {
      for (const style of testData.branding.cornerStyles) {
        const checkbox = brandingPage.iframe.getByRole('checkbox', { name: style });
        await expect(checkbox).toBeVisible();
      }
    });

    // Test Step 2: Verify Rounded is selected by default
    await test.step('Verify Rounded corner style is selected by default', async () => {
      const isRoundedSelected = await brandingPage.isRoundedSelected();
      expect(isRoundedSelected).toBe(true);
    });

    // Test Step 3: Verify other options are not selected
    await test.step('Verify other corner styles are not selected', async () => {
      const isSharpSelected = await brandingPage.isSharpCornerSelected();
      const isSlightlyRounded = await brandingPage.isSlightlyRoundedSelected();
      const isExtraRounded = await brandingPage.isExtraRoundedSelected();
      
      expect(isSharpSelected).toBe(false);
      expect(isSlightlyRounded).toBe(false);
      expect(isExtraRounded).toBe(false);
    });
  });

  test('should allow switching corner style options', async () => {
    // Test Step 1: Select Sharp corner
    await test.step('Select Sharp corner style', async () => {
      await brandingPage.selectSharpCorner();
      await brandingPage.page.waitForTimeout(500);
      
      const isSelected = await brandingPage.isSharpCornerSelected();
      expect(isSelected).toBe(true);
    });

    // Test Step 2: Select Extra rounded
    await test.step('Select Extra rounded corner style', async () => {
      await brandingPage.selectExtraRounded();
      await brandingPage.page.waitForTimeout(500);
      
      const isSelected = await brandingPage.isExtraRoundedSelected();
      expect(isSelected).toBe(true);
    });

    // Test Step 3: Restore to Rounded (default)
    await test.step('Restore Rounded corner style', async () => {
      await brandingPage.selectRounded();
      await brandingPage.page.waitForTimeout(500);
      
      const isSelected = await brandingPage.isRoundedSelected();
      expect(isSelected).toBe(true);
    });
  });

  test('should verify main font setting', async () => {
    // Test Step 1: Get current font
    await test.step('Verify default font displays', async () => {
      const currentFont = await brandingPage.getSelectedFont();
      expect(currentFont).toContain('Poppins');
    });

    // Test Step 2: Verify font dropdown is accessible
    await test.step('Verify font dropdown is accessible', async () => {
      await expect(brandingPage.mainFontDropdown).toBeVisible();
      await expect(brandingPage.mainFontDropdown).toBeEnabled();
    });
  });

  test('should verify Hide Loox branding option', async () => {
    // Test Step 1: Verify checkbox is visible
    await test.step('Verify Hide Loox branding checkbox is visible', async () => {
      await expect(brandingPage.hideLooxBrandingCheckbox).toBeVisible();
      await expect(brandingPage.hideLooxBrandingLabel).toBeVisible();
    });

    // Test Step 2: Get current state
    await test.step('Check current state of Hide Loox branding', async () => {
      const isChecked = await brandingPage.isHideLooxBrandingChecked();
      // Just verify we can read the state
      expect(typeof isChecked).toBe('boolean');
    });

    // Test Step 3: Toggle the checkbox
    await test.step('Toggle Hide Loox branding checkbox', async () => {
      const initialState = await brandingPage.isHideLooxBrandingChecked();
      
      await brandingPage.toggleHideLooxBranding();
      await brandingPage.page.waitForTimeout(500);
      
      const newState = await brandingPage.isHideLooxBrandingChecked();
      expect(newState).toBe(!initialState);
      
      // Toggle back to original state
      await brandingPage.toggleHideLooxBranding();
      await brandingPage.page.waitForTimeout(500);
      
      const restoredState = await brandingPage.isHideLooxBrandingChecked();
      expect(restoredState).toBe(initialState);
    });
  });
});



