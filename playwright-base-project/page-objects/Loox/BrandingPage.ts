import { Page, Locator, FrameLocator } from '@playwright/test';

/**
 * Page Object for Loox Branding Settings Page
 * Handles logo upload, style customization, and branding options
 */
export class BrandingPage {
  readonly page: Page;
  readonly iframe: FrameLocator;
  
  // Navigation elements
  readonly backHomeButton: Locator;
  readonly brandingMenuLink: Locator;
  
  // Logo upload section
  readonly logoHeading: Locator;
  readonly chooseFileButton: Locator;
  readonly logoUploadHelperText: Locator;
  
  // Style customization section
  readonly styleHeading: Locator;
  readonly styleDescription: Locator;
  
  // Star rating section
  readonly starRatingHeading: Locator;
  readonly starRatingColorPicker: Locator;
  readonly starRatingColorInput: Locator;
  
  // Corner style section
  readonly cornerStyleHeading: Locator;
  readonly sharpCornerCheckbox: Locator;
  readonly slightlyRoundedCheckbox: Locator;
  readonly roundedCheckbox: Locator;
  readonly extraRoundedCheckbox: Locator;
  
  // Font section
  readonly mainFontHeading: Locator;
  readonly mainFontDropdown: Locator;
  
  // Hide branding section
  readonly hideLooxBrandingCheckbox: Locator;
  readonly hideLooxBrandingLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.iframe = page.frameLocator('iframe[name="app-iframe"]');
    
    // Navigation elements
    this.backHomeButton = this.iframe.getByRole('button', { name: 'Back Home' });
    this.brandingMenuLink = this.iframe.getByTestId('branding-menu-item');
    
    // Logo upload
    this.logoHeading = this.iframe.getByText('Logo', { exact: true });
    this.chooseFileButton = this.iframe.getByRole('button', { name: 'Choose a file' });
    this.logoUploadHelperText = this.iframe.getByText('Upload an image (JPG, PNG, WEBP, JPEG, or GIF) up to 15 MB');
    
    // Style customization
    this.styleHeading = this.iframe.getByText('Style', { exact: true });
    this.styleDescription = this.iframe.getByText('Customize the look and feel of your reviews, emails, and widgets to fit your brand design');
    
    // Star rating
    this.starRatingHeading = this.iframe.getByText('Star rating', { exact: true });
    this.starRatingColorPicker = this.iframe.getByRole('combobox').first();
    this.starRatingColorInput = this.iframe.getByRole('textbox', { name: '' }).filter({ hasText: /#/ });
    
    // Corner style
    this.cornerStyleHeading = this.iframe.getByText('Corner style', { exact: true });
    this.sharpCornerCheckbox = this.iframe.getByRole('checkbox', { name: 'Sharp' });
    this.slightlyRoundedCheckbox = this.iframe.getByRole('checkbox', { name: 'Slightly rounded' });
    this.roundedCheckbox = this.iframe.getByRole('checkbox', { name: 'Rounded' });
    this.extraRoundedCheckbox = this.iframe.getByRole('checkbox', { name: 'Extra rounded' });
    
    // Main font
    this.mainFontHeading = this.iframe.getByText('Main font', { exact: true });
    this.mainFontDropdown = this.iframe.getByRole('combobox').last();
    
    // Hide branding
    this.hideLooxBrandingCheckbox = this.iframe.getByRole('checkbox', { name: 'Hide Loox branding' });
    this.hideLooxBrandingLabel = this.iframe.getByText('Hide Loox branding', { exact: true });
  }

  /**
   * Navigate to Branding page
   */
  async navigate() {
    await this.page.goto('/store/istqb5-qa4/apps/loox-qa4/merchant/owRpA393na/settings/branding');
    await this.page.waitForURL('**/settings/branding');
  }

  /**
   * Navigate to Branding from Settings menu
   */
  async navigateFromSettings() {
    await this.brandingMenuLink.click();
    await this.page.waitForURL('**/settings/branding');
  }

  /**
   * Upload logo file
   * @param filePath - Path to the logo file
   */
  async uploadLogo(filePath: string) {
    await this.chooseFileButton.setInputFiles(filePath);
  }

  /**
   * Check if Choose File button is visible
   */
  async isChooseFileButtonVisible(): Promise<boolean> {
    return await this.chooseFileButton.isVisible();
  }

  /**
   * Get star rating color value
   */
  async getStarRatingColor(): Promise<string> {
    return await this.starRatingColorInput.inputValue();
  }

  /**
   * Set star rating color
   * @param color - Hex color code (e.g., "#EBBF20")
   */
  async setStarRatingColor(color: string) {
    await this.starRatingColorInput.clear();
    await this.starRatingColorInput.fill(color);
  }

  /**
   * Check if Sharp corner style is selected
   */
  async isSharpCornerSelected(): Promise<boolean> {
    return await this.sharpCornerCheckbox.isChecked();
  }

  /**
   * Check if Slightly rounded corner style is selected
   */
  async isSlightlyRoundedSelected(): Promise<boolean> {
    return await this.slightlyRoundedCheckbox.isChecked();
  }

  /**
   * Check if Rounded corner style is selected
   */
  async isRoundedSelected(): Promise<boolean> {
    return await this.roundedCheckbox.isChecked();
  }

  /**
   * Check if Extra rounded corner style is selected
   */
  async isExtraRoundedSelected(): Promise<boolean> {
    return await this.extraRoundedCheckbox.isChecked();
  }

  /**
   * Select Sharp corner style
   */
  async selectSharpCorner() {
    await this.sharpCornerCheckbox.click();
  }

  /**
   * Select Slightly rounded corner style
   */
  async selectSlightlyRounded() {
    await this.slightlyRoundedCheckbox.click();
  }

  /**
   * Select Rounded corner style
   */
  async selectRounded() {
    await this.roundedCheckbox.click();
  }

  /**
   * Select Extra rounded corner style
   */
  async selectExtraRounded() {
    await this.extraRoundedCheckbox.click();
  }

  /**
   * Get selected main font
   */
  async getSelectedFont(): Promise<string | null> {
    const fontText = await this.iframe.getByText('Default (Poppins)');
    return await fontText.textContent();
  }

  /**
   * Check if Hide Loox branding is checked
   */
  async isHideLooxBrandingChecked(): Promise<boolean> {
    return await this.hideLooxBrandingCheckbox.isChecked();
  }

  /**
   * Toggle Hide Loox branding checkbox
   */
  async toggleHideLooxBranding() {
    await this.hideLooxBrandingCheckbox.click();
  }

  /**
   * Go back to home
   */
  async goBackHome() {
    await this.backHomeButton.click();
  }
}



