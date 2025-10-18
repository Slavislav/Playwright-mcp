# 📇 Automation Reference Card - Quick Copy

## 🎯 Minimal Trigger (Copy This)

```
Automate this test:

URL: [YOUR_URL]
Credentials: [USER] / [PASS]
Test: [TEST_CASE_DETAILS]

Use Playwright-MCP browser → Capture real selectors → Create page objects + test spec
```

---

## 📋 Standard Trigger (Recommended)

```
Create Playwright automation for:

**URL:** [YOUR_APPLICATION_URL]

**Credentials:**
- Username: [USERNAME]
- Password: [PASSWORD]

**Test Case ID:** TC-[MODULE]-[NUMBER]
**Priority:** P1 (Critical)

**Test Steps:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Results:**
- [Expected outcome 1]
- [Expected outcome 2]

**CRITICAL:** Use Playwright-MCP to:
1. Open real browser
2. Navigate and capture actual selectors
3. Create page objects with real locators
4. Write test spec with comprehensive assertions
```

---

## 📝 Detailed Trigger (Maximum Control)

```
Generate Playwright test automation:

**System Under Test:**
- URL: [YOUR_URL]
- Environment: [Dev/QA/Staging]
- Browser: Chromium (default)

**Authentication:**
- Username: [USER]
- Password: [PASS]
- Auth Type: [Form/SSO/API]

**Test Case Details:**
- ID: TC-[MODULE]-[NUMBER]
- Name: [Descriptive Name]
- Priority: [P1/P2/P3]
- Type: [Functional/Integration/E2E]

**Test Scenario:**
Objective: [What are we testing?]

Preconditions:
- [Condition 1]
- [Condition 2]

Steps:
1. [Action 1] → Verify: [Expected result]
2. [Action 2] → Verify: [Expected result]
3. [Action 3] → Verify: [Expected result]

Expected Results:
- [Overall expected outcome]
- [Specific verification points]

Test Data:
- Field1: [Value1]
- Field2: [Value2]

**Automation Requirements:**
✓ Use Playwright-MCP browser exploration
✓ Capture selectors from live application
✓ Create page objects in: page-objects/[AppName]/
✓ Externalize test data in: test-data/[appname]-data.json
✓ Write test spec: tests/TC-[ID]-[description].spec.ts
✓ Add comprehensive assertions (visibility, content, state)
✓ Include proper waits and timeouts
✓ Document with JSDoc comments
```

---

## 🎨 Template Patterns

### For Login Tests:
```
URL: [app-url]
Credentials: [user]/[pass]
Test: Verify user can login with valid credentials
Steps: Navigate → Enter credentials → Submit → Verify dashboard
```

### For CRUD Tests:
```
URL: [app-url]
Credentials: [admin]/[pass]
Test: Create new [entity] with required fields
Steps: Login → Navigate to [module] → Click Add → Fill form → Submit → Verify
Test Data: {field1: value1, field2: value2}
```

### For Search/Filter Tests:
```
URL: [app-url]
Credentials: [user]/[pass]
Test: Search for [entity] by [criteria]
Steps: Login → Navigate to list → Enter search term → Submit → Verify results
Search Term: [term]
```

### For Navigation Tests:
```
URL: [app-url]
Credentials: [user]/[pass]
Test: Verify [menu/tab] navigation
Steps: Login → Click [menu1] → Verify page1 → Click [menu2] → Verify page2
```

---

## ⚡ Quick Examples

### E-commerce:
```
Automate: Add product to cart
URL: https://shop.example.com
Credentials: customer@test.com / Pass123
Steps: Login → Browse products → Add to cart → Verify cart badge
```

### Admin Panel:
```
Automate: Create new user account
URL: https://admin.example.com
Credentials: admin / AdminPass
Steps: Login → Users → Add User → Fill form → Save → Verify success
Data: {name: "John Doe", email: "john@test.com", role: "Editor"}
```

### Booking System:
```
Automate: Book appointment
URL: https://booking.example.com
Credentials: user@test.com / UserPass
Steps: Login → Select service → Choose date/time → Confirm → Verify booking
Data: {service: "Consultation", date: "2024-01-15", time: "10:00"}
```

---

## 🔧 Common Additions

**With File Upload:**
```
Additional: Test includes file upload
File path: /path/to/test-file.pdf
Field: Document upload input
```

**With Dropdown Selection:**
```
Additional: Select from dropdown
Dropdown: Country selector
Value: "United States"
```

**With Dynamic Content:**
```
Additional: Wait for async data load
Element: User list table
Wait for: Spinner disappears + table visible
```

**With Multi-step Form:**
```
Additional: Multi-page form
Pages: Personal Info → Address → Payment → Review
Data per page: {...}
```

---

## 💡 Pro Tips

| Scenario | Tip |
|----------|-----|
| Slow pages | Add: "Increase timeout to 60s" |
| Dynamic IDs | Note: "Use text/role selectors" |
| Popups | Mention: "Modal appears after action" |
| Conditional UI | Specify: "Element X shows only if Y is true" |
| Multiple similar elements | Note: "Use .filter() or .nth()" |

---

## ✅ Checklist Before Triggering

- [ ] URL is accessible and correct
- [ ] Credentials are valid and working
- [ ] Test steps are clear and numbered
- [ ] Expected results are specific
- [ ] Test data is complete
- [ ] Special scenarios noted (uploads, modals, etc.)

---

## 🚀 Ready to Automate?

1. **Copy** one of the templates above
2. **Fill in** your details
3. **Paste** and send
4. **Get** complete test automation!

**The AI will:**
- ✓ Open Playwright-MCP browser
- ✓ Navigate to your application
- ✓ Capture real selectors
- ✓ Create page objects
- ✓ Write test specs
- ✓ Add comprehensive assertions

**You just need to provide URL + Credentials + Test Case!**




