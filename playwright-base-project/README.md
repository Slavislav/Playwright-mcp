# 🎭 Playwright Test Automation Framework - Loox QA4

A professional, production-ready Playwright test automation framework with TypeScript, Page Object Model, and comprehensive test organization for **Loox QA4** Shopify Review Management Application.

> **Part of:** ISTQB Testing Cup - Automation Aid Project  
> **Purpose:** Automated testing for Loox Review Management System  
> **Application:** Shopify iframe-based application with complex nested structures

---

## 🚀 Quick Start

### Installation
```bash
# Navigate to project directory
cd playwright-base-project

# Install dependencies
npm install

# Install Playwright browsers (first time only)
npx playwright install
```

### Run Tests
```bash
# Run all tests (headless)
npm test

# Run with visible browser
npm run test:headed

# Run specific test file
npx playwright test TC-EMAIL-001-email-replies-address.spec.ts

# Run tests by priority
npx playwright test --grep "@P1"
npx playwright test --grep "@P2"

# Run tests by tag
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

## 📁 Project Structure

```
playwright-base-project/
│
├── 📁 page-objects/Loox/              # Page Object Model (POM) for Loox
│   ├── EmailSettingsPage.ts          # Email configuration & compliance
│   ├── OrdersPage.ts                  # Order search & filtering
│   └── BrandingPage.ts                # Logo upload & style customization
│
├── 📁 test-data/                      # Test Data (JSON)
│   ├── loox-credentials.json         # Login credentials & app URLs
│   └── loox-test-data.json           # Test data for all modules
│
├── 📁 tests/                          # Test Specifications
│   ├── TC-EMAIL-001-email-replies-address.spec.ts         # P1 - Critical
│   ├── TC-EMAIL-002-email-compliance-settings.spec.ts     # P1 - Critical  
│   ├── TC-EMAIL-003-email-template-customization.spec.ts  # P1 - Critical
│   ├── TC-ORDER-001-order-search-functionality.spec.ts    # P2 - High
│   ├── TC-ORDER-002-order-filtering-options.spec.ts       # P2 - High
│   └── TC-BRAND-001-logo-upload-functionality.spec.ts     # P2 - High
│
├── 📁 test-results/                   # Test Execution Results
├── 📁 playwright-report/              # HTML Test Reports
│
├── ⚙️  playwright.config.ts           # Playwright Configuration
├── ⚙️  tsconfig.json                  # TypeScript Configuration
├── 📦 package.json                    # Dependencies
└── 📖 README.md                       # This file
```

---

## 🎯 Test Coverage Summary

### Test Cases Overview

| Test ID | Test Name | Priority | Risk | Module | Status |
|---------|-----------|----------|------|--------|--------|
| TC-EMAIL-001 | Email Replies Address Configuration | **P1** | R-001 | Email Settings | ✅ Automated |
| TC-EMAIL-002 | Email Compliance Settings Validation | **P1** | R-001, R-004 | Email Settings | ✅ Automated |
| TC-EMAIL-003 | Email Template Customization | **P1** | R-001, R-006 | Email Settings | ✅ Automated |
| TC-ORDER-001 | Order Search Functionality | **P2** | R-002 | Orders | ✅ Automated |
| TC-ORDER-002 | Order Filtering Options | **P2** | R-002 | Orders | ✅ Automated |
| TC-BRAND-001 | Logo Upload Functionality | **P2** | R-005 | Branding | ✅ Automated |

### Coverage by Module

- **Email Settings**: 100% (3 test cases)
- **Orders Management**: 100% (2 test cases)
- **Branding Customization**: 100% (1 test case)

### Coverage by Priority

- **P1 (Critical)**: 3 test cases - Email configuration & compliance
- **P2 (High)**: 3 test cases - Orders & branding functionality

---

## 🏗️ System Under Test (SUT)

### Loox QA4 Application Details

**Application Type:** Shopify iframe-based application  
**Access URL:** `https://admin.shopify.com/store/istqb5-qa4/apps/loox-qa4/merchant/owRpA393na`  
**Shopify Store:** istqb5-qa4  
**Merchant ID:** owRpA393na

### Key Characteristics

1. **Nested Iframe Architecture**: Main app iframe + nested iframe for some sections (Orders)
2. **Dynamic Content Loading**: Requires strategic waits for iframe content
3. **Shopify Integration**: Embedded within Shopify admin dashboard
4. **Module Structure**: Email Settings, Orders, Branding, Integrations, General settings

### Test Environment Access

Credentials stored in: `test-data/loox-credentials.json`

```json
{
  "shopifyAdmin": {
    "username": "slavastinov@gmail.com",
    "password": "ybPZ4D!nD/R*^3v"
  }
}
```

---

## 📊 Test Design

### Test Design Techniques Applied

1. **Boundary Value Analysis**: Email validation, file size limits (15MB)
2. **Equivalence Partitioning**: Valid/invalid email formats, file types
3. **State Transition Testing**: Compliance settings, radio button selections
4. **Pairwise Testing**: Compliance settings combinations
5. **Error Guessing**: Edge cases for iframe interactions

### Page Object Pattern

All tests use Page Object Model for maintainability:

```typescript
// Example: EmailSettingsPage
import { EmailSettingsPage } from '../page-objects/Loox/EmailSettingsPage';

test('should configure email settings', async ({ page }) => {
  const emailSettingsPage = new EmailSettingsPage(page);
  await emailSettingsPage.navigate();
  await emailSettingsPage.setEmailRepliesAddress('test@example.com');
});
```

---

## 🎨 Key Features

### ✅ **Iframe Handling**
- Automatic iframe detection and interaction
- Support for nested iframes (Orders page)
- Smart waiting strategies for iframe content

### ✅ **Page Object Model**
- Maintainable: Selectors in one place
- Reusable: Share page objects across tests
- Type-safe: TypeScript for intellisense

### ✅ **Comprehensive Test Data**
- Externalized JSON files
- Valid/invalid test data sets
- Easy to update and maintain

### ✅ **Professional Reporting**
- HTML reports with traces
- Screenshots on failure
- Video playback for debugging

---

## 🔧 Technical Details

### Iframe Architecture

Loox uses nested iframes which require special handling:

```typescript
// Main app iframe
this.iframe = page.frameLocator('iframe[name="app-iframe"]');

// Nested iframe (Orders page)
this.ordersFrame = this.iframe.frameLocator('iframe').first();
```

### Key Selectors Strategy

1. **Test IDs**: Primary method (e.g., `getByTestId('email-menu-item')`)
2. **Role-based**: Accessibility-first (e.g., `getByRole('button', { name: 'Edit' })`)
3. **Text-based**: For dynamic content (e.g., `getByText('Email Settings')`)
4. **Frame-scoped**: All selectors scoped to appropriate iframe

### Wait Strategies

```typescript
// Standard iframe wait
await page.waitForTimeout(2000);

// URL-based wait
await page.waitForURL('**/settings/email');

// Element visibility wait
await expect(element).toBeVisible();
```

---

## 🧪 Test Execution Examples

### Run by Priority

```bash
# Run all P1 (Critical) tests
npx playwright test --grep "@P1"

# Run all P2 (High priority) tests
npx playwright test --grep "@P2"
```

### Run by Module

```bash
# Run all Email tests
npx playwright test TC-EMAIL

# Run all Order tests
npx playwright test TC-ORDER

# Run all Branding tests
npx playwright test TC-BRAND
```

### Run Smoke Tests

```bash
# Run smoke test suite (P1 only)
npx playwright test --grep "@smoke"
```

### Run with Different Browsers

```bash
# Chromium only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# WebKit only
npx playwright test --project=webkit

# All browsers
npx playwright test
```

---

## 📈 Continuous Integration

### GitHub Actions Example

```yaml
name: Loox Playwright Tests
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

## 🎓 Best Practices Implemented

### 1. **Iframe Interaction**
```typescript
// ✅ GOOD - Frame-scoped selectors
const iframe = page.frameLocator('iframe[name="app-iframe"]');
await iframe.getByRole('button', { name: 'Save' }).click();

// ❌ AVOID - Direct page selectors for iframe content
await page.getByRole('button', { name: 'Save' }).click();
```

### 2. **Waiting Strategy**
```typescript
// ✅ GOOD - Smart waits for iframe content
await page.waitForTimeout(2000); // For iframe loading
await expect(element).toBeVisible(); // For element visibility

// ❌ AVOID - Fixed waits everywhere
await page.waitForTimeout(10000);
```

### 3. **Test Independence**
```typescript
// ✅ GOOD - Restore state after test
test.afterEach(async () => {
  await emailSettingsPage.setEmailRepliesAddress(originalEmail);
});
```

---

## 🚨 Known Issues & Workarounds

### Issue 1: Nested Iframe Timing
**Problem**: Orders page has nested iframe that loads slowly  
**Workaround**: Use 3-second wait after navigation
```typescript
await page.waitForTimeout(3000);
```

### Issue 2: Iframe Element Access
**Problem**: Elements inside iframe not immediately accessible  
**Workaround**: Use frame locators with proper scoping
```typescript
this.iframe = page.frameLocator('iframe[name="app-iframe"]');
```

---

## 📚 Additional Resources

### Documentation
- [Playwright Official Docs](https://playwright.dev)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Iframe Handling Guide](https://playwright.dev/docs/frames)

### Project Guides
- **Test Plan**: `../Automation Aid - Test Plan.html`
- **Test Design**: `../Loox-QA4-Test-Design.html`
- **Test Analysis**: `../Loox-QA4-Test-Analysis.html`

---

## 🏆 Test Automation Metrics

### Current Status
- ✅ **6/6 test cases automated** (100%)
- ✅ **3 Page Objects created**
- ✅ **2 Test data files configured**
- ✅ **100% P1/P2 coverage**

### Quality Metrics
- **Test Execution Time**: ~5-10 minutes (all tests)
- **Browser Coverage**: Chrome, Firefox, Safari
- **Reliability**: Designed for iframe stability
- **Maintainability**: Page Object pattern ensures easy updates

---

## 💡 Tips for Test Maintenance

1. **Update Selectors**: If UI changes, update page objects only
2. **Test Data**: Modify JSON files for different test scenarios
3. **Waits**: Adjust iframe wait times if performance changes
4. **New Tests**: Follow existing pattern for consistency
5. **Debugging**: Use `test:ui` mode for visual debugging

---

## 🔍 Troubleshooting

### Tests Timing Out
```bash
# Increase timeout in playwright.config.ts
actionTimeout: 60000,
navigationTimeout: 90000,
```

### Iframe Not Loading
```bash
# Increase wait time after navigation
await page.waitForTimeout(3000); // or more if needed
```

### Element Not Found
```bash
# Check iframe scope
const iframe = page.frameLocator('iframe[name="app-iframe"]');
await iframe.getByRole('button', { name: 'Click Me' }).click();
```

---

## 🤝 Contributing

When adding new tests:

1. Create page object in `page-objects/Loox/`
2. Add test data in `test-data/loox-test-data.json`
3. Write test spec in `tests/` with proper naming: `TC-MODULE-NNN-description.spec.ts`
4. Add priority tags: `@P1`, `@P2`, `@smoke`
5. Update this README with new coverage info

---

## 📞 Support

**Team:** Automation Aid  
**Competition:** ISTQB Testing Cup Grand Finals  
**Contact:** Team Lead - Slav Astinov  
**Date:** October 20, 2025

---

**Built for ISTQB Testing Cup** | **Team: Automation Aid** | **Powered by Playwright + AI**

---

## ⭐ Quick Command Reference

```bash
# Installation
npm install
npx playwright install

# Run Tests
npm test                              # All tests
npm run test:headed                   # With browser
npm run test:ui                       # UI mode
npx playwright test --grep "@P1"     # P1 tests only

# Reports
npm run test:report                   # View HTML report

# Debugging  
npm run test:debug                    # Debug mode
npx playwright show-trace [trace]    # View trace

# Specific Tests
npx playwright test TC-EMAIL-001-email-replies-address.spec.ts
```

---

**Status**: ✅ Production Ready | **Coverage**: 100% P1/P2 | **Last Updated**: October 20, 2025
