# Quick Reference: Expanded Test Cases
**Use this with existing Test Analysis and Test Design HTML documents**

---

## 🎯 How to Use This Document

This document SUPPLEMENTS the existing:
- `Loox-QA4-Test-Analysis.html` (6 existing test conditions)
- `Automation Aid - Test Design.html` (6 existing test cases)

Total test suite: **52 test cases** (6 existing + 46 new)

---

## 📋 COMPLETE TEST CASE LIST

### EXISTING (6) - Already in HTML Documents ✅
- TC-EMAIL-001: Email Replies Address Configuration ✅
- TC-EMAIL-002: Email Compliance Settings ✅  
- TC-EMAIL-003: Email Template Customization ✅
- TC-ORDER-001: Order Search Functionality ✅
- TC-ORDER-002: Order Filtering Options ✅
- TC-BRAND-001: Logo Upload Functionality ✅

### NEW PHASE 1 (17) - CRITICAL PRIORITY 🔴

#### Discounts Module (6)
**TC-DISCOUNT-001: Create Discount Code**
- Priority: P1 Critical
- Objective: Verify discount code creation functionality
- Steps: Navigate to Discounts > Create code > Configure settings > Save
- Expected: Code created with unique identifier, valid format
- Test Data: 10% discount, $5 fixed discount, free shipping

**TC-DISCOUNT-002: Configure Discount Settings**
- Priority: P1 Critical
- Objective: Verify discount configuration options
- Steps: Set amount/percentage > Define conditions > Set expiration
- Expected: All settings saved correctly, validation working
- Test Data: Percentage (10%, 25%, 50%), Fixed ($5, $10), Conditions (min order $50)

**TC-DISCOUNT-003: Associate Discount with Review**
- Priority: P1 Critical
- Objective: Verify discount-review link functionality
- Steps: Create discount > Link to review request > Send test email
- Expected: Discount code included in review request email
- Test Data: Test email addresses, various discount types

**TC-DISCOUNT-004: Validate Discount Code Generation**
- Priority: P1 Critical
- Objective: Verify code uniqueness and format
- Steps: Generate multiple codes > Check uniqueness > Verify format
- Expected: All codes unique, proper format (e.g., LOOX-XXXX-YYYY)
- Test Data: Generate 100 codes, check for duplicates

**TC-DISCOUNT-005: Test Discount Redemption Flow**
- Priority: P1 Critical
- Objective: Verify end-to-end discount redemption
- Steps: Customer receives code > Adds to cart > Applies code > Checkout
- Expected: Discount applied correctly, reflected in order total
- Test Data: Various order amounts, discount types

**TC-DISCOUNT-006: Verify Discount Expiration**
- Priority: P1 Critical
- Objective: Verify time-based expiration handling
- Steps: Set expiration date > Wait/simulate expiration > Test redemption
- Expected: Expired codes rejected with appropriate message
- Test Data: 24hr expiry, 7day expiry, 30day expiry

#### Review Forms (6)
**TC-FORM-001: Create Custom Review Form**
- Priority: P2 High
- Objective: Verify custom form creation
- Steps: Navigate to Review Form > Create new > Configure layout
- Expected: Form created, layout options working
- Test Data: Various layouts (single column, two column, grid)

**TC-FORM-002: Add Custom Questions**
- Priority: P2 High
- Objective: Verify custom question addition
- Steps: Add question > Set question text > Configure order
- Expected: Questions added, reordering works
- Test Data: 5-10 custom questions

**TC-FORM-003: Configure Question Types**
- Priority: P2 High
- Objective: Verify question type options
- Steps: Create questions > Set type (text, MCQ, rating, yes/no)
- Expected: All question types work correctly
- Test Data: All question type combinations

**TC-FORM-004: Set Required vs Optional**
- Priority: P2 High
- Objective: Verify field validation settings
- Steps: Set required/optional > Test submission > Verify validation
- Expected: Required fields enforced, optional skippable
- Test Data: Mix of required/optional fields

**TC-FORM-005: Preview Custom Form**
- Priority: P2 High
- Objective: Verify form preview functionality
- Steps: Create form > Click preview > Check desktop/mobile
- Expected: Preview accurate, responsive design works
- Test Data: Various screen sizes, devices

**TC-FORM-006: Test Form Submission**
- Priority: P2 High
- Objective: Verify end-to-end form submission
- Steps: Submit form as customer > Check data capture > Verify storage
- Expected: All data captured correctly, stored in database
- Test Data: Complete form submissions with all field types

#### Plan Management (5)
**TC-PLAN-001: View Current Plan Details**
- Priority: P2 High
- Objective: Verify plan information display
- Steps: Navigate to Settings > Plan > View details
- Expected: Plan name, features, limits displayed accurately
- Test Data: Current plan configuration

**TC-PLAN-002: Upgrade Plan Functionality**
- Priority: P2 High
- Objective: Verify plan upgrade process
- Steps: View plans > Select upgrade > Process payment > Confirm
- Expected: Upgrade successful, new features available
- Test Data: Upgrade from Basic to Premium

**TC-PLAN-003: Downgrade Plan Functionality**
- Priority: P2 High
- Objective: Verify plan downgrade process
- Steps: Select downgrade > Confirm data retention > Process
- Expected: Downgrade successful, data preserved
- Test Data: Downgrade from Premium to Basic

**TC-PLAN-004: Verify Feature Restrictions**
- Priority: P2 High
- Objective: Verify plan-based feature access
- Steps: Check feature availability > Test restricted features
- Expected: Plan limits enforced, premium features locked
- Test Data: Basic plan vs Premium plan feature list

**TC-PLAN-005: Test Plan Change Impact**
- Priority: P2 High
- Objective: Verify impact on data and features
- Steps: Change plan > Check existing data > Test features
- Expected: Data intact, features adjust to new plan
- Test Data: Reviews, widgets, settings before/after

### NEW PHASE 2 (19) - HIGH PRIORITY 🟡

#### Review Management (5)
**TC-REVIEW-001: View Product Reviews List**
- Priority: P2 High
- Test: List display, pagination, sorting by date/rating

**TC-REVIEW-002: Filter Product Reviews**
- Priority: P2 High  
- Test: Published, Pending, Spam filters

**TC-REVIEW-003: Moderate Product Review**
- Priority: P2 High
- Test: Approve, Reject, Flag as Spam actions

**TC-REVIEW-004: Edit Product Review Content**
- Priority: P2 High
- Test: Edit text, rating, photos, save changes

**TC-REVIEW-005: Delete Product Review**
- Priority: P2 High
- Test: Delete action, confirmation, permanent removal

#### Store Reviews (3)
**TC-STORE-REVIEW-001: View Store Reviews**
- Priority: P3 Medium
- Test: Store-level reviews display

**TC-STORE-REVIEW-002: Moderate Store Reviews**
- Priority: P3 Medium
- Test: Approve/reject store-level reviews

**TC-STORE-REVIEW-003: Respond to Store Review**
- Priority: P3 Medium
- Test: Merchant response functionality

#### Manual Requests (3)
**TC-MANUAL-REQUEST-001: Send Manual Request**
- Priority: P2 High
- Test: Single email, customer selection, send

**TC-MANUAL-REQUEST-002: Send Bulk Requests**
- Priority: P2 High
- Test: Bulk send, CSV upload, batch processing

**TC-MANUAL-REQUEST-003: Preview Manual Request**
- Priority: P2 High
- Test: Email preview before sending

#### Publishing (4)
**TC-PUBLISH-001: Publish Pending Review**
- Priority: P2 High
- Test: Single review publication

**TC-PUBLISH-002: Unpublish Published Review**
- Priority: P2 High
- Test: Remove from public display

**TC-PUBLISH-003: Bulk Publish Reviews**
- Priority: P2 High
- Test: Multi-select, bulk publish action

**TC-PUBLISH-004: Configure Auto-Publish**
- Priority: P2 High
- Test: Automatic publication settings

#### Email Editors (4)
**TC-EMAIL-EDITOR-001: Customize Review Request**
- Priority: P2 High
- Test: Template editing, variables

**TC-EMAIL-EDITOR-002: Customize Discount Email**
- Priority: P2 High
- Test: Discount email template

**TC-EMAIL-EDITOR-003: Preview Email Templates**
- Priority: P2 High
- Test: Email preview, test send

**TC-EMAIL-EDITOR-004: Test Dynamic Content**
- Priority: P2 High
- Test: Customer name, product name substitution

### NEW PHASE 3 (10) - MEDIUM PRIORITY 🟢

#### Widgets (10)
**TC-WIDGET-001**: Customize Product Reviews Widget Layout
**TC-WIDGET-002**: Add Product Reviews Widget to Theme
**TC-WIDGET-003**: Configure Product Reviews Display Options
**TC-WIDGET-004**: Add Star Rating Widget to Theme
**TC-WIDGET-005**: Verify Star Rating Display
**TC-WIDGET-006**: Customize Pop-up Widget Design
**TC-WIDGET-007**: Activate/Deactivate Pop-up Widget
**TC-WIDGET-008**: Configure Pop-up Timing
**TC-WIDGET-009**: Add Dynamic Carousel to Theme
**TC-WIDGET-010**: Configure Dynamic Carousel Settings

---

## 🎯 Execution Strategy

### Morning Session (3 hours)
**09:00-09:45**: Document finalization
**09:45-11:00**: Implement Phase 1 scripts (17 cases)
**11:00-12:00**: Implement Phase 2 scripts (19 cases)

### Afternoon Session (3 hours)
**13:00-14:00**: Execute Phase 1 tests (17 cases)
**14:00-15:00**: Execute Phase 2 tests (19 cases)
**15:00-15:30**: Execute Phase 3 tests (10 cases)
**15:30-16:00**: Report generation

---

## 📊 Coverage Metrics

| Phase | Test Cases | Priority | Coverage Added |
|-------|-----------|----------|----------------|
| Existing | 6 | P1-P2 | 8% |
| Phase 1 | 17 | P1-P2 | +22% = 30% |
| Phase 2 | 19 | P2-P3 | +25% = 55% |
| Phase 3 | 10 | P3 | +13% = 68% |
| **TOTAL** | **52** | **P1-P3** | **68%** |

---

## ✅ Implementation Status

- ✅ 6 test cases implemented and passing
- ✅ 46 test cases designed and documented
- ✅ All test data identified
- ✅ All page objects ready
- ✅ Framework validated

**Next**: Implement Phase 1 & 2 test scripts (36 cases)

---

**Document Purpose**: Quick reference for expanded test suite  
**Status**: Complete and ready for implementation  
**Coverage**: 68% of 76 identified features (52/76 test cases)

