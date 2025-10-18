# 🤖 Playwright Test Automation - Trigger Prompt

Use this prompt to automatically generate Playwright test automation for any web application.

---

## 📋 TRIGGER PROMPT

```
I need you to create Playwright test automation for the following System Under Test (SUT):

**URL:** [PASTE_YOUR_URL_HERE]

**Credentials (if required):**
- Username: [PASTE_USERNAME]
- Password: [PASTE_PASSWORD]
- Role/Type: [e.g., Admin, User, etc.]

**Test Case to Automate:**
[PASTE YOUR TEST CASE DETAILS HERE - Include test steps, expected results, test data]

---

## ⚠️ CRITICAL REQUIREMENTS:

### 1. USE PLAYWRIGHT-MCP BROWSER (MANDATORY)
- **You MUST open a real browser** using Playwright-MCP tools
- **Navigate to the actual URL** and explore the live application
- **Capture REAL selectors** from the actual DOM elements
- **DO NOT assume or guess selectors** - get them from the browser snapshot
- Take snapshots at each important page/step

### 2. EXPLORATION WORKFLOW
Follow this exact sequence:
1. Open browser and navigate to the URL
2. Take a snapshot of the login/home page
3. If credentials provided, perform login and capture the flow
4. Navigate through the test case steps using Playwright-MCP
5. Capture selectors for EVERY element you interact with
6. Document the actual page structure and element hierarchy

### 3. FILE STRUCTURE
Create the following files in `playwright-base-project/`:

**Page Objects** (`page-objects/[SUT-NAME]/`):
- `[Feature]Page.ts` - One file per page/module
- Use clear, descriptive class names
- Include locators for ALL interactive elements
- Add helper methods for common actions
- Document each method with JSDoc comments

**Test Data** (`test-data/`):
- `[sut-name]-credentials.json` - Login credentials
- `[sut-name]-[entity].json` - Test data for entities
- Use meaningful, descriptive field names
- Include valid and invalid data sets

**Test Specs** (`tests/`):
- `TC-[MODULE]-[NUMBER]-[description].spec.ts`
- Follow the naming from test case ID
- Include full test case metadata in comments
- Use test.step() for each test step
- Add comprehensive assertions

### 4. CODE QUALITY STANDARDS

**Selectors Priority:**
1. `getByRole()` - PREFERRED (accessibility)
2. `getByPlaceholder()` - For form inputs
3. `getByText()` - For unique text content
4. `locator()` with `.filter()` - For complex cases
5. Use `.last()` or `.first()` only when necessary

**Page Objects:**
```typescript
import { Page, Locator } from '@playwright/test';

export class [Feature]Page {
  readonly page: Page;
  readonly element1: Locator;
  readonly element2: Locator;

  constructor(page: Page) {
    this.page = page;
    // Use REAL selectors from browser snapshot
    this.element1 = page.getByRole('button', { name: 'Actual Text' });
  }

  async performAction() {
    // Add proper waits
    await this.element1.click();
  }
}
```

**Test Structure:**
```typescript
import { test, expect } from '@playwright/test';

/**
 * TC-[ID]: [Test Case Name]
 * Priority: P1/P2/P3
 * Test Type: Functional/UI/Integration
 * Objective: [Clear objective]
 */

test.describe('[Test Suite Name]', () => {
  test.beforeEach(async ({ page }) => {
    // Setup and login if needed
  });

  test('should [expected behavior]', async ({ page }) => {
    await test.step('Step 1: [Description]', async () => {
      // Action
      // Assertion with timeout
      await expect(element).toBeVisible({ timeout: 10000 });
    });
  });
});
```

### 5. ASSERTIONS - BE COMPREHENSIVE
For EVERY test step, verify:
- ✅ Element visibility (`toBeVisible()`)
- ✅ URL changes (`toHaveURL()`)
- ✅ Text content (`toHaveText()`, `toContainText()`)
- ✅ Form values (`toHaveValue()`)
- ✅ Counts/numbers match expected
- ✅ Success/error messages appear
- ✅ Page state is correct

### 6. WAITS AND TIMEOUTS
- Use `page.waitForURL()` after navigation
- Use `expect().toBeVisible({ timeout: 10000 })` for async elements
- Add `page.waitForLoadState('networkidle')` after searches
- Use `page.waitForTimeout()` sparingly and only when necessary
- Increase test timeout for slow operations: `test.setTimeout(60000)`

### 7. DO NOT WORRY ABOUT
- ❌ Making tests pass on first run (I'll fix issues)
- ❌ Performance optimization initially
- ❌ Advanced error handling
- ❌ Performance/load testing
- ❌ Cross-browser quirks (focus on functionality)

### 8. DELIVERABLES

Provide:
1. **Page Object files** - One per major page/module
2. **Test data files** - JSON with all required test data
3. **Test spec files** - Complete with all test steps
4. **Execution summary** - What was created and file locations

### 9. WORKFLOW EXAMPLE

```
1. Navigate to URL using Playwright-MCP
   → Take snapshot
   → Identify login elements

2. Perform login (if credentials provided)
   → Capture login flow
   → Take snapshot of dashboard/home

3. Navigate to test feature
   → Click through menus
   → Capture each page structure

4. Create Page Objects
   → Extract selectors from snapshots
   → Build reusable methods

5. Create Test Specs
   → Implement test steps
   → Add assertions at each step

6. Report what was created
```

---

## 📝 EXAMPLE USAGE

```
I need you to create Playwright test automation for the following System Under Test (SUT):

**URL:** https://example-app.com

**Credentials:**
- Username: admin@example.com
- Password: SecurePass123
- Role/Type: Administrator

**Test Case to Automate:**

TC-LOGIN-001: Verify Admin Login
Priority: P1
Steps:
1. Navigate to login page
2. Enter valid admin credentials
3. Click login button
4. Verify dashboard loads
5. Verify admin menu is visible

Expected Results:
- Login successful
- Redirected to /dashboard
- Admin name displayed in header
- Full admin menu accessible
```

---

## ✅ SUCCESS CRITERIA

Your automation is successful when:
- ✓ All selectors are captured from REAL browser interactions
- ✓ Page objects are well-organized and reusable
- ✓ Test specs follow the exact test case steps
- ✓ Comprehensive assertions at each step
- ✓ Clear, readable code with proper comments
- ✓ Test data is externalized in JSON files
- ✓ No assumed/guessed selectors - all verified from browser

---

## 🚀 START YOUR AUTOMATION NOW!

Paste your URL, credentials, and test case details above, and I'll:
1. ✅ Open Playwright-MCP browser
2. ✅ Explore your application live
3. ✅ Capture real selectors
4. ✅ Generate complete test automation
5. ✅ Create all necessary files

**Remember: Quality over speed. Real selectors over assumptions. Comprehensive assertions over minimal checks.**
```




