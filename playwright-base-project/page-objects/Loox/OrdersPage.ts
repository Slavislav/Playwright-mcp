import { Page, Locator, FrameLocator } from '@playwright/test';

/**
 * Page Object for Loox Orders Page
 * Handles order search, filtering, and management
 */
export class OrdersPage {
  readonly page: Page;
  readonly iframe: FrameLocator;
  readonly ordersFrame: FrameLocator;
  
  // Navigation elements
  readonly backHomeButton: Locator;
  readonly ordersMenuLink: Locator;
  
  // Search and filter elements
  readonly searchInput: Locator;
  readonly statusFilterDropdown: Locator;
  readonly timeRangeDropdown: Locator;
  readonly searchButton: Locator;
  
  // Order results elements
  readonly orderResults: Locator;

  constructor(page: Page) {
    this.page = page;
    this.iframe = page.frameLocator('iframe[name="app-iframe"]');
    // Orders page has a nested iframe
    this.ordersFrame = this.iframe.frameLocator('iframe').first();
    
    // Navigation elements
    this.backHomeButton = this.iframe.getByRole('button', { name: 'Back Home' });
    this.ordersMenuLink = this.iframe.getByTestId('orders-menu-item');
    
    // Search and filter elements
    this.searchInput = this.ordersFrame.getByRole('textbox', { name: 'Search by email' });
    this.statusFilterDropdown = this.ordersFrame.getByRole('combobox').first();
    this.timeRangeDropdown = this.ordersFrame.getByRole('combobox').nth(1);
    this.searchButton = this.ordersFrame.getByRole('button', { name: 'Search' });
    
    // Order results
    this.orderResults = this.ordersFrame.locator('[data-testid="order-result"]').or(this.ordersFrame.locator('div').filter({ hasText: /@/ }));
  }

  /**
   * Navigate to Orders page
   */
  async navigate() {
    await this.page.goto('/store/istqb5-qa4/apps/loox-qa4/merchant/owRpA393na/settings/orders');
    await this.page.waitForURL('**/settings/orders');
  }

  /**
   * Navigate to Orders from Settings menu
   */
  async navigateFromSettings() {
    await this.ordersMenuLink.click();
    await this.page.waitForURL('**/settings/orders');
  }

  /**
   * Search for orders by email
   * @param email - Email address to search for
   */
  async searchByEmail(email: string) {
    await this.searchInput.fill(email);
  }

  /**
   * Select status filter
   * @param status - Status filter option ("All orders", "Sent", "Scheduled/Pending fulfillment", "Review received", "Blocked from Loox emails", "Cancelled")
   */
  async selectStatusFilter(status: string) {
    await this.statusFilterDropdown.click();
    await this.ordersFrame.getByRole('option', { name: status }).click();
  }

  /**
   * Select time range
   * @param timeRange - Time range option ("All time", "Custom")
   */
  async selectTimeRange(timeRange: string) {
    await this.timeRangeDropdown.click();
    await this.ordersFrame.getByRole('option', { name: timeRange }).click();
  }

  /**
   * Click search button
   */
  async clickSearch() {
    await this.searchButton.click();
  }

  /**
   * Perform complete search with filters
   * @param email - Email address to search for
   * @param status - Status filter option
   * @param timeRange - Time range option
   */
  async performSearch(email: string, status: string = 'All orders', timeRange: string = 'All time') {
    await this.searchByEmail(email);
    await this.selectStatusFilter(status);
    await this.selectTimeRange(timeRange);
    await this.clickSearch();
  }

  /**
   * Get search input value
   */
  async getSearchInputValue(): Promise<string> {
    return await this.searchInput.inputValue();
  }

  /**
   * Get selected status filter
   */
  async getSelectedStatusFilter(): Promise<string> {
    return await this.statusFilterDropdown.inputValue();
  }

  /**
   * Get selected time range
   */
  async getSelectedTimeRange(): Promise<string> {
    return await this.timeRangeDropdown.inputValue();
  }

  /**
   * Check if order results are displayed
   */
  async areOrderResultsDisplayed(): Promise<boolean> {
    return await this.orderResults.first().isVisible();
  }

  /**
   * Get order result text containing email
   * @param email - Email to search for in results
   */
  async getOrderResultByEmail(email: string): Promise<Locator> {
    return this.ordersFrame.getByText(email).first();
  }

  /**
   * Get product name from order result
   * @param email - Email of the order
   */
  async getProductNameFromOrder(email: string): Promise<string | null> {
    const orderContainer = this.ordersFrame.locator(`div:has-text("${email}")`).first();
    const productName = orderContainer.locator('text=/.*Snowboard.*|.*Product.*/');
    return await productName.textContent();
  }

  /**
   * Get order status text
   * @param email - Email of the order
   */
  async getOrderStatus(email: string): Promise<string | null> {
    const orderContainer = this.ordersFrame.locator(`div:has-text("${email}")`).first();
    const statusText = orderContainer.locator('text=/Sent:.*|Scheduled.*/');
    return await statusText.textContent();
  }

  /**
   * Go back to home
   */
  async goBackHome() {
    await this.backHomeButton.click();
  }
}



