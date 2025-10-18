# 🚀 Quick Start - Automated Test Generation

## One-Command Automation

Copy and paste this template, fill in your details, and get instant test automation:

---

```
Create Playwright test automation:

URL: [YOUR_APP_URL]

Credentials:
- Username: [USERNAME]
- Password: [PASSWORD]

Test Case:
[PASTE_YOUR_TEST_CASE]

Requirements:
1. Use Playwright-MCP to browse the actual application
2. Capture real selectors from live DOM
3. Create page objects with proper locators
4. Write comprehensive test spec with assertions
5. Externalize test data in JSON files
```

---

## Example (Copy & Modify):

```
Create Playwright test automation:

URL: https://www.saucedemo.com

Credentials:
- Username: standard_user
- Password: secret_sauce

Test Case:
TC-CART-001: Add Product to Cart
1. Login with valid credentials
2. Click on first product
3. Click "Add to Cart" button
4. Verify cart badge shows "1"
5. Click cart icon
6. Verify product is in cart

Requirements:
1. Use Playwright-MCP to browse the actual application
2. Capture real selectors from live DOM
3. Create page objects with proper locators
4. Write comprehensive test spec with assertions
5. Externalize test data in JSON files
```

---

## What Happens Next?

I will:
1. ✅ Open a real browser using Playwright-MCP
2. ✅ Navigate to your URL
3. ✅ Login with your credentials
4. ✅ Execute each test step manually
5. ✅ Capture actual selectors from the page
6. ✅ Create Page Object files
7. ✅ Create test data files
8. ✅ Create complete test spec
9. ✅ Provide execution report

## Files Created:

```
playwright-base-project/
├── page-objects/
│   └── [YourApp]/
│       ├── LoginPage.ts
│       ├── [Feature]Page.ts
│       └── ...
├── test-data/
│   ├── [app]-credentials.json
│   └── [app]-testdata.json
└── tests/
    └── TC-[ID]-[description].spec.ts
```

---

## 💡 Pro Tips:

1. **Provide complete test cases** - More details = better automation
2. **Include all test data** - Sample data helps create realistic tests
3. **Mention special scenarios** - Dropdowns, file uploads, etc.
4. **Be specific about assertions** - What should be verified?

---

## 🎯 Ready? Paste Your Details Above!




