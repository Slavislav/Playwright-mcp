import { Page, Locator, FrameLocator } from '@playwright/test';

/**
 * Page Object for Loox Email Settings Page
 * Handles email configuration, compliance settings, and customization
 */
export class EmailSettingsPage {
  readonly page: Page;
  readonly iframe: FrameLocator;
  
  // Navigation elements
  readonly backHomeButton: Locator;
  readonly generalMenuButton: Locator;
  readonly emailSettingsLink: Locator;
  
  // Email customization section
  readonly emailCustomizationHeading: Locator;
  readonly editEmailAppearanceButton: Locator;
  
  // Email replies address section
  readonly emailRepliesAddressInput: Locator;
  readonly emailRepliesAddressHelperText: Locator;
  
  // Email compliance section
  readonly emailComplianceHeading: Locator;
  readonly unsubscribeFromLooxAndShopifyRadio: Locator;
  readonly keepSubscribedToShopifyRadio: Locator;
  readonly customersWithMarketingConsentAndUSRadio: Locator;
  readonly onlyCustomersWithMarketingConsentRadio: Locator;
  readonly allCustomersRadio: Locator;
  readonly sendTransactionalEmailsCheckbox: Locator;
  
  // Exclude orders section
  readonly excludeOrdersHeading: Locator;
  readonly orderTagInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.iframe = page.frameLocator('iframe[name="app-iframe"]');
    
    // Navigation elements
    this.backHomeButton = this.iframe.getByRole('button', { name: 'Back Home' });
    this.generalMenuButton = this.iframe.getByTestId('general-settings-menu-item');
    this.emailSettingsLink = this.iframe.getByTestId('email-menu-item');
    
    // Email customization
    this.emailCustomizationHeading = this.iframe.getByText('Email customization');
    this.editEmailAppearanceButton = this.iframe.getByRole('button', { name: 'Edit' });
    
    // Email replies address
    this.emailRepliesAddressInput = this.iframe.getByRole('textbox', { name: 'Send email replies to:' });
    this.emailRepliesAddressHelperText = this.iframe.getByText('Leave this blank to send email replies to');
    
    // Email compliance
    this.emailComplianceHeading = this.iframe.getByText('Email compliance', { exact: true });
    this.unsubscribeFromLooxAndShopifyRadio = this.iframe.getByRole('radio', { name: 'Unsubscribe customers from Loox and Shopify marketing emails' });
    this.keepSubscribedToShopifyRadio = this.iframe.getByRole('radio', { name: 'Keep customers subscribed to Shopify marketing emails' });
    this.customersWithMarketingConsentAndUSRadio = this.iframe.getByRole('radio', { name: 'Customers who gave marketing consent and all U.S. customers' });
    this.onlyCustomersWithMarketingConsentRadio = this.iframe.getByRole('radio', { name: 'Only customers who gave marketing consent' });
    this.allCustomersRadio = this.iframe.getByRole('radio', { name: 'All customers' });
    this.sendTransactionalEmailsCheckbox = this.iframe.getByRole('checkbox', { name: 'Send transactional emails to customers who did not give marketing consent' });
    
    // Exclude orders
    this.excludeOrdersHeading = this.iframe.getByText('Exclude orders from Loox emails');
    this.orderTagInput = this.iframe.getByRole('textbox', { name: 'order_tag' });
  }

  /**
   * Navigate to Email Settings page
   */
  async navigate() {
    await this.page.goto('/store/istqb5-qa4/apps/loox-qa4/merchant/owRpA393na/settings/general/email');
    await this.page.waitForURL('**/settings/general/email');
  }

  /**
   * Navigate to Email Settings from Settings menu
   */
  async navigateFromSettings() {
    await this.generalMenuButton.click();
    await this.emailSettingsLink.click();
    await this.page.waitForURL('**/settings/general/email');
  }

  /**
   * Get the current email replies address
   */
  async getEmailRepliesAddress(): Promise<string> {
    return await this.emailRepliesAddressInput.inputValue();
  }

  /**
   * Set email replies address
   * @param email - Email address to set
   */
  async setEmailRepliesAddress(email: string) {
    await this.emailRepliesAddressInput.clear();
    await this.emailRepliesAddressInput.fill(email);
  }

  /**
   * Clear email replies address
   */
  async clearEmailRepliesAddress() {
    await this.emailRepliesAddressInput.clear();
  }

  /**
   * Check if unsubscribe from Loox and Shopify is selected
   */
  async isUnsubscribeFromLooxAndShopifySelected(): Promise<boolean> {
    return await this.unsubscribeFromLooxAndShopifyRadio.isChecked();
  }

  /**
   * Check if keep subscribed to Shopify is selected
   */
  async isKeepSubscribedToShopifySelected(): Promise<boolean> {
    return await this.keepSubscribedToShopifyRadio.isChecked();
  }

  /**
   * Select unsubscribe from Loox and Shopify option
   */
  async selectUnsubscribeFromLooxAndShopify() {
    await this.unsubscribeFromLooxAndShopifyRadio.click();
  }

  /**
   * Select keep subscribed to Shopify option
   */
  async selectKeepSubscribedToShopify() {
    await this.keepSubscribedToShopifyRadio.click();
  }

  /**
   * Check if "Customers with marketing consent and US" is selected
   */
  async isCustomersWithMarketingConsentAndUSSelected(): Promise<boolean> {
    return await this.customersWithMarketingConsentAndUSRadio.isChecked();
  }

  /**
   * Check if "Only customers with marketing consent" is selected
   */
  async isOnlyCustomersWithMarketingConsentSelected(): Promise<boolean> {
    return await this.onlyCustomersWithMarketingConsentRadio.isChecked();
  }

  /**
   * Check if "All customers" is selected
   */
  async isAllCustomersSelected(): Promise<boolean> {
    return await this.allCustomersRadio.isChecked();
  }

  /**
   * Select "Customers with marketing consent and US" option
   */
  async selectCustomersWithMarketingConsentAndUS() {
    await this.customersWithMarketingConsentAndUSRadio.click();
  }

  /**
   * Select "Only customers with marketing consent" option
   */
  async selectOnlyCustomersWithMarketingConsent() {
    await this.onlyCustomersWithMarketingConsentRadio.click();
  }

  /**
   * Select "All customers" option
   */
  async selectAllCustomers() {
    await this.allCustomersRadio.click();
  }

  /**
   * Check if send transactional emails checkbox is checked
   */
  async isSendTransactionalEmailsChecked(): Promise<boolean> {
    return await this.sendTransactionalEmailsCheckbox.isChecked();
  }

  /**
   * Toggle send transactional emails checkbox
   */
  async toggleSendTransactionalEmails() {
    await this.sendTransactionalEmailsCheckbox.click();
  }

  /**
   * Click Edit button for email appearance customization
   */
  async clickEditEmailAppearance() {
    await this.editEmailAppearanceButton.click();
  }

  /**
   * Go back to home
   */
  async goBackHome() {
    await this.backHomeButton.click();
  }
}



