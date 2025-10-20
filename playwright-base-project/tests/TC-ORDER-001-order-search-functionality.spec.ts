import { test, expect } from '@playwright/test';
import { OrdersPage } from '../page-objects/Loox/OrdersPage';
import testData from '../test-data/loox-test-data.json';

/**
 * TC-ORDER-001: Order Search Functionality
 * Priority: P2 - High
 * Risk: R-002 - Shopify API integration failure
 * Type: Functional - Search and Integration Tests
 * 
 * Test Objective: Verify order search functionality
 */
test.describe('TC-ORDER-001: Order Search Functionality @P2', () => {
  let ordersPage: OrdersPage;

  test.beforeEach(async ({ page }) => {
    ordersPage = new OrdersPage(page);
    
    // Navigate to Orders page
    await ordersPage.navigate();
    
    // Wait for iframe and nested iframe to load
    await page.waitForTimeout(3000);
  });

  test('should display order search interface correctly', async () => {
    // Test Step 1: Verify search input is visible
    await test.step('Verify search input is displayed', async () => {
      await expect(ordersPage.searchInput).toBeVisible();
    });

    // Test Step 2: Verify filter dropdowns are visible
    await test.step('Verify filter dropdowns are visible', async () => {
      await expect(ordersPage.statusFilterDropdown).toBeVisible();
      await expect(ordersPage.timeRangeDropdown).toBeVisible();
    });

    // Test Step 3: Verify search button is visible
    await test.step('Verify search button is visible', async () => {
      await expect(ordersPage.searchButton).toBeVisible();
    });
  });

  test('should search for order by valid email address', async () => {
    const searchEmail = testData.orderSearch.expectedOrder.email;

    // Test Step 1: Enter email in search box
    await test.step(`Enter "${searchEmail}" in search box`, async () => {
      await ordersPage.searchByEmail(searchEmail);
      
      const inputValue = await ordersPage.getSearchInputValue();
      expect(inputValue).toBe(searchEmail);
    });

    // Test Step 2: Click Search button
    await test.step('Click Search button', async () => {
      await ordersPage.clickSearch();
      
      // Wait for search results
      await ordersPage.page.waitForTimeout(2000);
    });

    // Test Step 3: Verify search results display
    await test.step('Verify search results display order', async () => {
      const orderEmail = await ordersPage.getOrderResultByEmail(searchEmail);
      await expect(orderEmail).toBeVisible();
    });
  });

  test('should verify order details in search results', async () => {
    const searchEmail = testData.orderSearch.expectedOrder.email;

    // Test Step 1: Perform search
    await test.step('Search for order', async () => {
      await ordersPage.searchByEmail(searchEmail);
      await ordersPage.clickSearch();
      await ordersPage.page.waitForTimeout(2000);
    });

    // Test Step 2: Verify order shows product name
    await test.step('Verify order shows product name', async () => {
      const orderResult = await ordersPage.getOrderResultByEmail(searchEmail);
      await expect(orderResult).toBeVisible();
      
      // Verify product name is displayed
      const productText = await ordersPage.ordersFrame.getByText('The Archived Snowboard');
      await expect(productText).toBeVisible();
    });

    // Test Step 3: Verify order shows status
    await test.step('Verify order shows status', async () => {
      const statusText = await ordersPage.ordersFrame.getByText(/Sent:/);
      await expect(statusText).toBeVisible();
    });
  });

  test('should handle empty search gracefully', async () => {
    // Test Step 1: Leave search field empty
    await test.step('Verify search with empty field', async () => {
      const emptyValue = await ordersPage.getSearchInputValue();
      expect(emptyValue).toBe('');
    });

    // Test Step 2: Click search with empty field
    await test.step('Click search with empty field', async () => {
      await ordersPage.clickSearch();
      await ordersPage.page.waitForTimeout(1000);
      
      // Verify button is still clickable and no error occurs
      await expect(ordersPage.searchButton).toBeEnabled();
    });
  });

  test('should allow clearing search field', async () => {
    // Test Step 1: Enter search term
    await test.step('Enter search term', async () => {
      await ordersPage.searchByEmail('test@example.com');
      const value = await ordersPage.getSearchInputValue();
      expect(value).toBe('test@example.com');
    });

    // Test Step 2: Clear search field
    await test.step('Clear search field', async () => {
      await ordersPage.searchInput.clear();
      const clearedValue = await ordersPage.getSearchInputValue();
      expect(clearedValue).toBe('');
    });
  });

  test('should maintain search input after search', async () => {
    const searchEmail = testData.orderSearch.expectedOrder.email;

    // Test Step 1: Perform search
    await test.step('Perform search', async () => {
      await ordersPage.searchByEmail(searchEmail);
      await ordersPage.clickSearch();
      await ordersPage.page.waitForTimeout(2000);
    });

    // Test Step 2: Verify search input still contains email
    await test.step('Verify search input maintains value', async () => {
      const inputValue = await ordersPage.getSearchInputValue();
      expect(inputValue).toBe(searchEmail);
    });
  });

  test('should search with different valid email formats', async () => {
    for (const email of testData.orderSearch.validEmails) {
      await test.step(`Test search with: ${email}`, async () => {
        await ordersPage.searchByEmail(email);
        const inputValue = await ordersPage.getSearchInputValue();
        expect(inputValue).toBe(email);
        
        await ordersPage.clickSearch();
        await ordersPage.page.waitForTimeout(1000);
        
        // Verify search executed without errors
        await expect(ordersPage.searchButton).toBeEnabled();
      });
    }
  });
});



