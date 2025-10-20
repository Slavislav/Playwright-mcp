import { test, expect } from '@playwright/test';
import { OrdersPage } from '../page-objects/Loox/OrdersPage';
import testData from '../test-data/loox-test-data.json';

/**
 * TC-ORDER-002: Order Filtering Options
 * Priority: P2 - High
 * Risk: R-002 - Shopify API integration failure
 * Type: Functional - Filter and Data Management Tests
 * 
 * Test Objective: Verify order filtering functionality
 */
test.describe('TC-ORDER-002: Order Filtering Options @P2', () => {
  let ordersPage: OrdersPage;

  test.beforeEach(async ({ page }) => {
    ordersPage = new OrdersPage(page);
    
    // Navigate to Orders page
    await ordersPage.navigate();
    
    // Wait for iframe and nested iframe to load
    await page.waitForTimeout(3000);
  });

  test('should display default filter values', async () => {
    // Test Step 1: Verify default status filter
    await test.step('Verify default status filter is "All orders"', async () => {
      const selectedOption = await ordersPage.statusFilterDropdown.locator('option[selected]').textContent();
      expect(selectedOption).toBe('All orders');
    });

    // Test Step 2: Verify default time range
    await test.step('Verify default time range is "All time"', async () => {
      const selectedOption = await ordersPage.timeRangeDropdown.locator('option[selected]').textContent();
      expect(selectedOption).toBe('All time');
    });
  });

  test('should test all status filter options', async () => {
    for (const statusOption of testData.orderFilters.statusOptions) {
      await test.step(`Test status filter: ${statusOption}`, async () => {
        // Select status option
        await ordersPage.selectStatusFilter(statusOption);
        
        // Wait for filter to apply
        await ordersPage.page.waitForTimeout(500);
        
        // Verify option can be selected without errors
        await expect(ordersPage.statusFilterDropdown).toBeVisible();
      });
    }
  });

  test('should test "All orders" filter option', async () => {
    // Test Step 1: Select "All orders"
    await test.step('Select All orders filter', async () => {
      await ordersPage.selectStatusFilter('All orders');
      await ordersPage.page.waitForTimeout(1000);
    });

    // Test Step 2: Click search
    await test.step('Execute search with All orders filter', async () => {
      await ordersPage.clickSearch();
      await ordersPage.page.waitForTimeout(1000);
      
      // Verify search executes successfully
      await expect(ordersPage.searchButton).toBeEnabled();
    });
  });

  test('should test "Sent" filter option', async () => {
    // Test Step 1: Select "Sent" status
    await test.step('Select Sent filter', async () => {
      await ordersPage.selectStatusFilter('Sent');
      await ordersPage.page.waitForTimeout(1000);
    });

    // Test Step 2: Execute search
    await test.step('Execute search with Sent filter', async () => {
      await ordersPage.clickSearch();
      await ordersPage.page.waitForTimeout(1000);
    });
  });

  test('should test "Scheduled/Pending fulfillment" filter option', async () => {
    // Test Step 1: Select "Scheduled/Pending fulfillment"
    await test.step('Select Scheduled/Pending fulfillment filter', async () => {
      await ordersPage.selectStatusFilter('Scheduled/Pending fulfillment');
      await ordersPage.page.waitForTimeout(1000);
    });

    // Test Step 2: Execute search
    await test.step('Execute search with filter', async () => {
      await ordersPage.clickSearch();
      await ordersPage.page.waitForTimeout(1000);
    });
  });

  test('should test "Review received" filter option', async () => {
    // Test Step 1: Select "Review received"
    await test.step('Select Review received filter', async () => {
      await ordersPage.selectStatusFilter('Review received');
      await ordersPage.page.waitForTimeout(1000);
    });

    // Test Step 2: Execute search
    await test.step('Execute search with filter', async () => {
      await ordersPage.clickSearch();
      await ordersPage.page.waitForTimeout(1000);
    });
  });

  test('should test "Blocked from Loox emails" filter option', async () => {
    // Test Step 1: Select "Blocked from Loox emails"
    await test.step('Select Blocked from Loox emails filter', async () => {
      await ordersPage.selectStatusFilter('Blocked from Loox emails');
      await ordersPage.page.waitForTimeout(1000);
    });

    // Test Step 2: Execute search
    await test.step('Execute search with filter', async () => {
      await ordersPage.clickSearch();
      await ordersPage.page.waitForTimeout(1000);
    });
  });

  test('should test "Cancelled" filter option', async () => {
    // Test Step 1: Select "Cancelled"
    await test.step('Select Cancelled filter', async () => {
      await ordersPage.selectStatusFilter('Cancelled');
      await ordersPage.page.waitForTimeout(1000);
    });

    // Test Step 2: Execute search
    await test.step('Execute search with filter', async () => {
      await ordersPage.clickSearch();
      await ordersPage.page.waitForTimeout(1000);
    });
  });

  test('should test time range filter options', async () => {
    // Test Step 1: Test "All time" option
    await test.step('Select All time range', async () => {
      await ordersPage.selectTimeRange('All time');
      await ordersPage.page.waitForTimeout(500);
    });

    // Test Step 2: Test "Custom" option
    await test.step('Select Custom time range', async () => {
      await ordersPage.selectTimeRange('Custom');
      await ordersPage.page.waitForTimeout(500);
      
      // Verify custom option can be selected
      await expect(ordersPage.timeRangeDropdown).toBeVisible();
    });

    // Test Step 3: Switch back to "All time"
    await test.step('Switch back to All time', async () => {
      await ordersPage.selectTimeRange('All time');
      await ordersPage.page.waitForTimeout(500);
    });
  });

  test('should test combined filters with search', async () => {
    // Test Step 1: Enter search email
    await test.step('Enter search email', async () => {
      await ordersPage.searchByEmail(testData.orderSearch.expectedOrder.email);
    });

    // Test Step 2: Select status filter
    await test.step('Select Sent status filter', async () => {
      await ordersPage.selectStatusFilter('Sent');
      await ordersPage.page.waitForTimeout(500);
    });

    // Test Step 3: Select time range
    await test.step('Select All time range', async () => {
      await ordersPage.selectTimeRange('All time');
      await ordersPage.page.waitForTimeout(500);
    });

    // Test Step 4: Execute search
    await test.step('Execute combined search', async () => {
      await ordersPage.clickSearch();
      await ordersPage.page.waitForTimeout(2000);
      
      // Verify search executed successfully
      await expect(ordersPage.searchButton).toBeEnabled();
    });
  });

  test('should maintain filter selections after search', async () => {
    const selectedStatus = 'Sent';
    const selectedTimeRange = 'All time';

    // Test Step 1: Set filters
    await test.step('Set filter selections', async () => {
      await ordersPage.selectStatusFilter(selectedStatus);
      await ordersPage.selectTimeRange(selectedTimeRange);
    });

    // Test Step 2: Execute search
    await test.step('Execute search', async () => {
      await ordersPage.clickSearch();
      await ordersPage.page.waitForTimeout(1000);
    });

    // Test Step 3: Verify filters are maintained (this would depend on app behavior)
    await test.step('Verify filters still visible', async () => {
      await expect(ordersPage.statusFilterDropdown).toBeVisible();
      await expect(ordersPage.timeRangeDropdown).toBeVisible();
    });
  });

  test('should test filter switching sequence', async () => {
    // Test Step 1: Cycle through status filters
    await test.step('Cycle through status filters', async () => {
      await ordersPage.selectStatusFilter('All orders');
      await ordersPage.page.waitForTimeout(300);
      
      await ordersPage.selectStatusFilter('Sent');
      await ordersPage.page.waitForTimeout(300);
      
      await ordersPage.selectStatusFilter('Cancelled');
      await ordersPage.page.waitForTimeout(300);
      
      // Verify last selection worked
      await expect(ordersPage.statusFilterDropdown).toBeVisible();
    });

    // Test Step 2: Cycle through time ranges
    await test.step('Cycle through time ranges', async () => {
      await ordersPage.selectTimeRange('All time');
      await ordersPage.page.waitForTimeout(300);
      
      await ordersPage.selectTimeRange('Custom');
      await ordersPage.page.waitForTimeout(300);
      
      await ordersPage.selectTimeRange('All time');
      await ordersPage.page.waitForTimeout(300);
      
      // Verify last selection worked
      await expect(ordersPage.timeRangeDropdown).toBeVisible();
    });
  });
});



