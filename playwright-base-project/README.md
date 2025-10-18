# 🎭 Playwright Test Automation Framework

A professional, production-ready Playwright test automation framework with TypeScript, Page Object Model, and comprehensive test organization.

> **Part of:** ISTQB Testing Cup - Automation Aid Project  
> **Purpose:** Rapid test automation for System Under Test (SUT) analysis and validation

---

## 🚀 Quick Start - Generate Tests Instantly

**New to this project?** Use our AI-powered automation:
- 📖 **[QUICK-START.md](./QUICK-START.md)** - Copy-paste template for instant automation
- 🤖 **[AUTOMATION-TRIGGER-PROMPT.md](./AUTOMATION-TRIGGER-PROMPT.md)** - Complete automation guide
- 📇 **[AUTOMATION-REFERENCE-CARD.md](./AUTOMATION-REFERENCE-CARD.md)** - Quick patterns & examples

**Just provide:** URL + Credentials + Test Case → **Get:** Complete page objects + test specs + test data

---

## 📁 Project Structure - After Automation

Once you've automated tests for your application, the project will look like this:

```
playwright-base-project/
│
├── 📁 page-objects/                    # Page Object Model (POM)
│   └── [YourApp]/                      # Organized by application/module
│       ├── LoginPage.ts                # Login page interactions
│       ├── DashboardPage.ts            # Dashboard/home page
│       ├── [Feature]Page.ts            # Feature-specific pages
│       └── [Module]Page.ts             # Module-specific pages
│
├── 📁 test-data/                       # Test Data (JSON)
│   ├── [app]-credentials.json          # Login credentials
│   ├── [app]-users.json                # User test data
│   └── [app]-[entity].json             # Entity-specific data
│
├── 📁 tests/                           # Test Specifications
│   ├── TC-[MODULE]-001-[name].spec.ts  # Test case specs
│   ├── TC-[MODULE]-002-[name].spec.ts  # Organized by test ID
│   └── README.md                       # Test documentation
│
├── 📁 helpers/                         # Utilities & Helpers
│   ├── auth-helper.ts                  # Authentication utilities
│   ├── data-generator.ts               # Test data generators
│   └── api-helper.ts                   # API integration helpers
│
├── 📁 test-results/                    # Test Execution Results
│   ├── results.json                    # JSON test results
│   └── [timestamp]/                    # Screenshots & videos
│
├── 📁 playwright-report/               # HTML Test Reports
│   └── index.html                      # Interactive test report
│
├── ⚙️  playwright.config.ts            # Playwright Configuration
├── ⚙️  tsconfig.json                   # TypeScript Configuration
├── 📦 package.json                     # Dependencies
├── 📖 README.md                        # This file
├── 📋 SETUP.md                         # Installation guide
└── 🚀 Automation Guides/               # AI automation templates
    ├── QUICK-START.md
    ├── AUTOMATION-TRIGGER-PROMPT.md
    └── AUTOMATION-REFERENCE-CARD.md
```

---

## 🏗️ Architecture - How It Works

### 1. **Page Objects** (`page-objects/`)

Page Objects encapsulate page interactions and selectors, making tests maintainable and reusable.

**Example:** `page-objects/ShopApp/LoginPage.ts`
```typescript
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('.error-message');
  }

  async navigate() {
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }
}
```

### 2. **Test Data** (`test-data/`)

JSON files store test data separately from test logic, making it easy to update and maintain.

**Example:** `test-data/shopapp-credentials.json`
```json
{
  "validAdmin": {
    "username": "admin@shop.com",
    "password": "SecurePass123",
    "role": "Administrator"
  },
  "validCustomer": {
    "username": "customer@shop.com",
    "password": "CustomerPass",
    "role": "Customer"
  },
  "invalidUser": {
    "username": "invalid@shop.com",
    "password": "wrongpass"
  }
}
```

### 3. **Test Specifications** (`tests/`)

Test specs implement actual test cases with clear structure and comprehensive assertions.

**Example:** `tests/TC-AUTH-001-valid-admin-login.spec.ts`
```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/ShopApp/LoginPage';
import { DashboardPage } from '../page-objects/ShopApp/DashboardPage';
import credentials from '../test-data/shopapp-credentials.json';

/**
 * TC-AUTH-001: Validate Admin Login
 * Priority: P1 - Critical
 * Type: Functional - Positive Test
 */
test.describe('TC-AUTH-001: Admin Login Validation', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigate();
  });

  test('should login successfully with valid admin credentials', async ({ page }) => {
    // Test Step 1: Enter valid credentials
    await test.step('Enter admin credentials', async () => {
      await loginPage.login(
        credentials.validAdmin.username,
        credentials.validAdmin.password
      );
    });

    // Test Step 2: Verify successful login
    await test.step('Verify dashboard loads', async () => {
      await page.waitForURL('**/dashboard');
      await expect(dashboardPage.welcomeMessage).toBeVisible();
      await expect(dashboardPage.adminMenu).toBeVisible();
    });

    // Test Step 3: Verify user profile
    await test.step('Verify admin profile displayed', async () => {
      const profileName = await dashboardPage.getUserProfileName();
      expect(profileName).toContain('Admin');
    });
  });
});
```

### 4. **Helpers** (`helpers/`)

Utility functions for common operations across tests.

**Example:** `helpers/auth-helper.ts`
```typescript
import { Page } from '@playwright/test';
import { LoginPage } from '../page-objects/ShopApp/LoginPage';

export async function loginAsAdmin(page: Page) {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('admin@shop.com', 'SecurePass123');
  await page.waitForURL('**/dashboard');
}

export async function loginAsCustomer(page: Page) {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('customer@shop.com', 'CustomerPass');
  await page.waitForURL('**/home');
}
```

---

## 🎯 Key Features

### ✅ **Page Object Model (POM)**
- **Maintainable:** Selectors in one place
- **Reusable:** Share page objects across tests
- **Readable:** Clear, descriptive method names
- **Type-safe:** TypeScript for intellisense

### ✅ **Organized Test Data**
- **Externalized:** JSON files separate from tests
- **Manageable:** Easy to update test data
- **Portable:** Same tests, different environments
- **Version controlled:** Track data changes

### ✅ **Comprehensive Testing**
- **Multi-browser:** Chromium, Firefox, WebKit
- **Parallel execution:** Fast test runs
- **Rich assertions:** Playwright's built-in expects
- **Visual debugging:** Screenshots & videos on failure

### ✅ **Professional Reporting**
- **HTML reports:** Interactive, filterable results
- **JSON output:** CI/CD integration
- **Trace viewer:** Debug failures step-by-step
- **Video playback:** See exactly what happened

---

## 🚦 Running Tests

### Installation
```bash
# Install dependencies
npm install

# Install browsers (first time only)
npx playwright install
```

### Execute Tests
```bash
# Run all tests (headless)
npm test

# Run with visible browser
npm run test:headed

# Run specific test file
npx playwright test TC-AUTH-001-valid-admin-login.spec.ts

# Run tests matching pattern
npx playwright test --grep "@smoke"

# Run in UI mode (interactive)
npm run test:ui

# Debug specific test
npm run test:debug
```

### View Results
```bash
# Open HTML report
npm run test:report

# View trace of failed tests
npx playwright show-trace test-results/[test-name]/trace.zip
```

---

## 📊 Test Organization

### Test Case Naming Convention
```
TC-[MODULE]-[NUMBER]-[description].spec.ts

Examples:
TC-AUTH-001-valid-admin-login.spec.ts
TC-CART-001-add-product-to-cart.spec.ts
TC-CHECKOUT-001-complete-purchase.spec.ts
```

### Priority Tags
```typescript
test('should login successfully @smoke @P1', async ({ page }) => {
  // Critical path test
});

test('should show validation error @P2', async ({ page }) => {
  // Important test
});

test('should handle edge case @P3', async ({ page }) => {
  // Nice to have
});
```

### Test Organization Patterns
```
tests/
├── authentication/
│   ├── TC-AUTH-001-valid-login.spec.ts
│   ├── TC-AUTH-002-invalid-login.spec.ts
│   └── TC-AUTH-003-logout.spec.ts
├── shopping-cart/
│   ├── TC-CART-001-add-product.spec.ts
│   └── TC-CART-002-remove-product.spec.ts
└── checkout/
    └── TC-CHECKOUT-001-complete-order.spec.ts
```

---

## ⚙️ Configuration

### `playwright.config.ts` - Main Settings
```typescript
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,           // Run tests in parallel
  retries: process.env.CI ? 2 : 0,  // Retry on CI
  workers: process.env.CI ? 1 : undefined,
  
  use: {
    baseURL: 'https://your-app.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  
  projects: [
    { name: 'chromium' },
    { name: 'firefox' },
    { name: 'webkit' },
  ],
});
```

### Environment-Specific Configuration
```typescript
// Use different base URLs per environment
baseURL: process.env.TEST_ENV === 'staging' 
  ? 'https://staging.your-app.com'
  : 'https://your-app.com'
```

---

## 🎨 Best Practices Implemented

### 1. **Selector Strategy**
```typescript
// ✅ GOOD - Accessible selectors
page.getByRole('button', { name: 'Submit' })
page.getByPlaceholder('Search...')
page.getByLabel('Email address')

// ❌ AVOID - Brittle selectors
page.locator('#btn-123')
page.locator('.css-class-xyz')
```

### 2. **Waiting Strategy**
```typescript
// ✅ GOOD - Auto-waiting with assertions
await expect(page.locator('.result')).toBeVisible();
await page.waitForURL('**/success');

// ❌ AVOID - Fixed waits
await page.waitForTimeout(5000);
```

### 3. **Error Handling**
```typescript
// ✅ GOOD - Meaningful error messages
await expect(loginPage.errorMessage)
  .toHaveText('Invalid credentials', 
    { message: 'Expected login error not shown' });

// ✅ GOOD - Soft assertions for multiple checks
await expect.soft(element1).toBeVisible();
await expect.soft(element2).toBeVisible();
```

### 4. **Test Independence**
```typescript
// ✅ GOOD - Each test is independent
test.beforeEach(async ({ page }) => {
  await loginPage.navigate();
  await loginAsAdmin(page);
});

// ✅ GOOD - Clean up after test
test.afterEach(async ({ page }) => {
  await page.close();
});
```

---

## 📈 Continuous Integration

### GitHub Actions Example
```yaml
name: Playwright Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 📚 Additional Resources

### Playwright Documentation
- [Official Playwright Docs](https://playwright.dev)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)

### Project Guides
- **[SETUP.md](./SETUP.md)** - Detailed installation instructions
- **[QUICK-START.md](./QUICK-START.md)** - AI-powered test generation
- **[AUTOMATION-TRIGGER-PROMPT.md](./AUTOMATION-TRIGGER-PROMPT.md)** - Complete automation guide

---

## 🏆 Success Metrics

After automation, you should have:
- ✅ **100% selector coverage** - All elements have reliable locators
- ✅ **Page Object pattern** - Organized, maintainable code
- ✅ **Comprehensive assertions** - Verify expected outcomes
- ✅ **Test data separation** - JSON files for easy updates
- ✅ **Rich reporting** - HTML reports with traces
- ✅ **CI/CD ready** - Automated test execution
- ✅ **Fast feedback** - Parallel execution enabled

---

## 🎯 What Makes This Framework Special

### AI-Powered Test Generation
- Automatically creates page objects from live applications
- Captures real selectors using Playwright-MCP
- Generates complete test specs from test case descriptions
- Produces production-ready code, not just drafts

### Competition-Ready
- Fast test creation for unknown SUTs
- Professional documentation included
- Follows ISTQB best practices
- Ready for time-constrained scenarios

### Production-Grade Quality
- TypeScript for type safety
- Page Object Model for maintainability
- Comprehensive error handling
- Industry-standard patterns

---

## 💡 Tips for Success

1. **Start with automation guides** - Use QUICK-START.md for fastest results
2. **Let AI explore first** - Playwright-MCP captures real selectors
3. **Organize by modules** - Group related page objects together
4. **Use meaningful names** - Clear test case IDs and descriptions
5. **Assert comprehensively** - Verify all expected outcomes
6. **Run tests frequently** - Catch issues early
7. **Review reports** - Use traces to debug failures

---

## 🚀 Ready to Automate?

**See:** [QUICK-START.md](./QUICK-START.md) for instant test generation!

**Need help?** Check [AUTOMATION-TRIGGER-PROMPT.md](./AUTOMATION-TRIGGER-PROMPT.md) for detailed guidance.

---

**Built for ISTQB Testing Cup** | **Team: Automation Aid** | **Powered by Playwright + AI**
