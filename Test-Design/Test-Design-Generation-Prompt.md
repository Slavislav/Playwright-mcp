# Test Design Generation Kick-Off Prompt

## Purpose
This prompt enables automated generation of comprehensive Test Design documents for ISTQB Testing Cup competition, building upon both Test Plan and Test Analysis foundations to create detailed, executable test cases and scenarios.

## When to Use This Prompt
Use this prompt when you need to:
- Generate Test Design document for ISTQB Testing Cup competition
- Create comprehensive test cases based on Test Plan and Test Analysis foundations
- Maximize scoring points (20/20) in Test Analysis and Design category
- Deliver professional, competition-ready documentation with executable test design

## Required Inputs
To use this prompt, provide:
1. **Test Plan Document** - Previously generated Test Plan (strategic foundation)
2. **Test Analysis Document** - Previously generated Test Analysis (detailed conditions)
3. **SUT Overview Document** - Original SUT analysis for reference
4. **SUT URL** - The web application URL for targeted data gathering
5. **Login Credentials** (if required):
   - Username
   - Password
6. **Competition Context**:
   - Team Name: Automation Aid
   - Team Lead: Slav Astinov
   - Test Lead: Sava Barbarov
   - Event: ISTQB Testing Cup Grand Finals
   - Date: October 20th, 2025
   - Location: Copenhagen, Denmark
7. **⚠️ CRITICAL - Competition Day Schedule:**
   - **Competition Date:** October 20, 2025 (SINGLE DAY EVENT)
   - **Morning Session (09:00 - 12:00):** Test planning, analysis, and design
   - **Lunch Break (12:00 - 13:00):** DO NOT include in schedule
   - **Afternoon Session (13:00 - 16:00):** Test implementation, execution, and reporting
   - **Judges' Debriefing (16:00 - 17:00):** DO NOT include in schedule
   - **IMPORTANT:** All testing activities must fit within the 6-hour window (3 hours morning + 3 hours afternoon)
   - **External Stakeholders:** Only the Product Owner provided by ISTQB (no other external parties should be listed)

## Process Overview
The Test Design generation follows this systematic approach:

### Phase 1: Foundation Analysis
- Analyze both Test Plan and Test Analysis documents for comprehensive understanding
- Reference PROJECT-SYSTEM-MESSAGE.md for Test Design scoring criteria
- Review Test Design Knowledge Base for document structure requirements
- Identify test conditions requiring detailed test case design

### Phase 2: Targeted Data Gathering
- Use Playwright MCP to gather specific Test Design data from SUT
- Focus on detailed functionality for test case creation
- Capture specific UI elements, data inputs, and validation requirements
- Document test data sets and automation opportunities

### Phase 3: Test Design Document Generation
- Create comprehensive Test Design following knowledge base structure
- Optimize content for ISTQB competition scoring (20 points)
- Generate professional HTML output using template design
- Ensure executable test cases with proper design techniques

## Detailed Process Instructions

### Step 1: Foundation Analysis & Preparation
```
1. Read and analyze both Test Plan and Test Analysis documents (foundations from previous generation)
2. Review PROJECT-SYSTEM-MESSAGE.md for Test Design scoring criteria:
   - Focus on high-risk features
   - Well-defined test conditions, cases, and charters
   - Prioritization and traceability
   - Avoid missing basic tests or designing more than executing
3. Reference Test-Design/test-design-knowledge-base.md for document structure
4. Cross-reference with SUT Overview for comprehensive system understanding
5. Identify test conditions from Test Analysis requiring detailed test case design
6. Plan test design techniques application (State Transition, Boundary Value, etc.)
```

### Step 2: Targeted Playwright MCP Exploration
```
1. Navigate to SUT using provided URL and credentials
2. Focus on gathering Test Design specific data:
   - Detailed UI elements for test case creation
   - Specific data inputs and validation requirements
   - User interaction flows and navigation paths
   - Error conditions and boundary values
   - Test data requirements and formats
   - Automation opportunities and tool integration
3. Capture specific functionality details for test case design
4. Document form fields, validation rules, and expected behaviors
5. Identify test design technique applications (State Transition, Boundary Value, etc.)
6. Gather evidence for comprehensive test coverage
```

### Step 3: Test Design Document Generation
```
1. Create comprehensive Test Design document addressing all scoring criteria:
   - Detailed test cases for high-risk features
   - Application of appropriate test design techniques
   - Executable test scenarios with clear steps
   - Proper test data sets and validation criteria
   - Automation opportunities identification
   - Complete traceability to Test Plan and Test Analysis
2. Structure content according to test-design-knowledge-base.md
3. Generate HTML output using Documents/template.html design
4. Include competition context and team information
5. Ensure professional, competition-ready presentation
```

## Test Design Scoring Optimization

### Critical Success Factors (20 Points)
**Focus on High-Risk Features:**
- Design detailed test cases for critical business functions
- Apply appropriate test design techniques to high-risk areas
- Ensure comprehensive coverage of failure scenarios
- Prioritize test cases based on risk impact

**Well-Defined Test Conditions, Cases, and Charters:**
- Create specific, executable test cases
- Define clear test steps and expected results
- Develop comprehensive test data sets
- Include both positive and negative test scenarios

**Prioritization and Traceability:**
- Maintain traceability to Test Plan risks and Test Analysis conditions
- Prioritize test cases based on risk and business impact
- Document coverage analysis and test case relationships
- Ensure complete mapping from requirements to test cases

**Avoid Penalty Points:**
- Include all essential test cases (don't miss basic functionality)
- Design realistic, executable test cases
- Avoid over-designing beyond execution capabilities
- Balance comprehensive coverage with practical execution

## Document Structure Requirements

### Based on Test-Design Knowledge Base
1. **Test Design Techniques** - Application of appropriate techniques
2. **State Transition Testing** - State-based test case design
3. **Boundary Value Analysis** - Edge condition testing
4. **Equivalence Partitioning** - Class-based test case design
5. **Pairwise Testing** - Combination testing optimization
6. **Error Guessing** - Experience-based test case creation
7. **Test Case Design** - Detailed, executable test cases
8. **Test Data Design** - Comprehensive test data sets
9. **Automation Opportunities** - Tool integration and automation
10. **Coverage Analysis** - Test coverage assessment

### HTML Output Requirements
- **Template:** Use Documents/template.html design
- **Header:** Include team information and competition context
- **Design Consistency:** Professional, competition-ready appearance
- **Content Structure:** Adapt template sections for Test Design content
- **Visual Elements:** Test case tables, flow diagrams, coverage matrices
- **⚠️ CRITICAL - HTML File Generation Strategy:**
  - **NEVER attempt to generate the entire HTML file in one operation**
  - **Step 1:** Create a blank HTML file first using PowerShell: `Set-Content -Path "filename.html" -Value "" -Encoding UTF8`
  - **Step 2:** Generate HTML content in small batches (sections) using `Add-Content` for each section
  - **Step 3:** Add sections incrementally: Header → Metadata → TOC → Each Major Section → Footer → Closing tags
  - **Reason:** Large HTML files exceed token limits and cause generation failures
- **⚠️ CRITICAL - Character Encoding:**
  - **NEVER use emoji characters or special Unicode symbols** (e.g., 🖨️, 📋, ✅, ❌, ⚠️, 🎯, 🤖, 🏆, 🚨, ⏰)
  - **Use standard ASCII characters only** for all visual indicators
  - **Use HTML entities for special characters** when needed (e.g., &check; for checkmarks)
  - **Reason:** Emoji and Unicode characters display as garbled text (e.g., ðŸ–¨ï) in the HTML output

## Integration with Previous Documents

### Building Upon Test Plan Foundation
- **Risk Alignment:** Design test cases for Test Plan identified risks
- **Scope Consistency:** Ensure test cases cover Test Plan scope
- **Methodology Integration:** Follow Test Plan testing approach
- **Resource Consideration:** Design within Test Plan resource constraints

### Building Upon Test Analysis Foundation
- **Condition Implementation:** Convert Test Analysis conditions to test cases
- **Scenario Detail:** Expand Test Analysis scenarios into detailed test cases
- **Traceability Maintenance:** Link test cases to Test Analysis conditions
- **Priority Alignment:** Maintain Test Analysis prioritization

### Complete Traceability Chain
- **Test Plan Risks → Test Analysis Conditions → Test Design Cases**
- **Test Plan Scope → Test Analysis Coverage → Test Design Execution**
- **Test Plan Objectives → Test Analysis Scenarios → Test Design Steps**

## Test Design Techniques Application

### State Transition Testing
- **Purpose:** Test application state changes and transitions
- **Application:** Login workflows, multi-step processes, status changes
- **Benefits:** Visualizes state flows, identifies transition errors

### Boundary Value Analysis
- **Purpose:** Test values at the edges of valid ranges
- **Application:** Form validation, numeric inputs, date ranges
- **Benefits:** Identifies edge case failures, validates boundary logic

### Equivalence Partitioning
- **Purpose:** Test representative values from each equivalence class
- **Application:** Input validation, user roles, data categories
- **Benefits:** Reduces test cases while maintaining coverage

### Pairwise Testing
- **Purpose:** Test combinations of input parameters efficiently
- **Application:** Complex forms with multiple fields, configuration options
- **Benefits:** Optimizes test case count while covering interactions

### Error Guessing
- **Purpose:** Use experience to identify potential failure areas
- **Application:** Edge cases, unusual user behaviors, system limitations
- **Benefits:** Identifies scenarios formal techniques might miss

## Quality Assurance Checklist

### Pre-Generation Validation
- ✅ Test Plan and Test Analysis documents analyzed thoroughly
- ✅ Test conditions identified for detailed design
- ✅ Competition scoring criteria understood
- ✅ Knowledge base structure reviewed
- ✅ Test design techniques planned
- ✅ Playwright MCP exploration plan defined

### Post-Generation Validation
- ✅ All 20 scoring points addressed comprehensively
- ✅ High-risk features have detailed test case coverage
- ✅ Test cases are well-defined and executable
- ✅ Appropriate test design techniques applied
- ✅ Complete traceability maintained
- ✅ Test cases are realistic and executable
- ✅ Professional HTML presentation achieved
- ✅ Team and competition context included

## Success Criteria

### Competition Scoring Targets
- **Test Analysis and Design: 20/20 points**
  - Focus on high-risk features: Comprehensive test case design
  - Well-defined test conditions, cases, and charters: Executable test cases
  - Prioritization and traceability: Complete mapping chain
  - No penalty points for missing basic tests or over-designing

### Quality Indicators
- ✅ Professional, competition-ready documentation
- ✅ High-risk features have comprehensive test case coverage
- ✅ Test cases are specific, executable, and measurable
- ✅ Appropriate test design techniques applied throughout
- ✅ Complete traceability to previous documents
- ✅ Risk-based prioritization maintained
- ✅ ISTQB best practices demonstrated

## Example Usage
```
User Input:
- Test Plan Document: [Previously generated Test Plan]
- Test Analysis Document: [Previously generated Test Analysis]
- SUT Overview: [Original SUT analysis document]
- SUT URL: https://example-sut.com
- Username: admin
- Password: admin123
- Competition Context: ISTQB Testing Cup Grand Finals

Expected Output:
- Comprehensive Test Design HTML document
- 20/20 scoring optimization
- Detailed, executable test cases
- Appropriate test design techniques applied
- Complete traceability chain maintained
```

## Integration with Test Execution
The Test Design document serves as foundation for:
- **Test Execution** - Provides detailed test cases for execution
- **Test Automation** - Identifies automation opportunities and requirements
- **Test Reporting** - Establishes criteria for test result evaluation
- **Defect Management** - Provides basis for defect identification and reporting

## Competition Toolstack

### Testing Tools (Use in Test Design Documentation)
When designing detailed test cases, specify the appropriate tool for each test case type:

#### **1. Security & Penetration Testing**
- **Tool:** OWASP ZAP
- **Usage:** Exploratory security testing using spiders, active/passive scanning, request manipulation
- **Test Case Design:** Security test cases with ZAP spider configuration, scan policies, attack vectors
- **Deliverable:** OWASP ZAP report published to project folder

#### **2. Accessibility Testing**
- **Tool:** Google Lighthouse
- **Usage:** Automated accessibility audits, WCAG compliance validation
- **Test Case Design:** Accessibility test cases with Lighthouse audit criteria, WCAG checkpoints
- **Deliverable:** Lighthouse accessibility report with compliance scores

#### **3. Load & Performance Testing**
- **Tool:** K6 + Performance Analyzer Addon
- **Usage:** Load testing scripts, performance benchmarking, stress testing scenarios
- **Test Case Design:** Performance test cases with load profiles, virtual user scenarios, performance thresholds
- **Deliverable:** K6 performance test report published to project folder

#### **4. Test Automation**
- **Tool:** Playwright
- **Usage:** Automated functional test scripts for high-priority test cases
- **Test Case Design:** Detailed automated test cases for P1/P2 priority scenarios
- **Deliverable:** Playwright test scripts published to GitHub repository
- **Priority:** High-priority (P1/P2) test cases MUST be automated

#### **5. Workflow & Documentation**
- **Tools:** Cursor, Claude, n8n
- **Usage:** 
  - **Cursor + Claude:** AI-assisted test case design, test data generation, validation logic
  - **n8n:** Test execution workflow automation, report generation pipelines
- **Application:** Test case optimization, execution orchestration, reporting automation

#### **6. System Under Test Exploration**
- **Tool:** Playwright MCP (Model Context Protocol)
- **Usage:** Detailed UI element identification, test data preparation, workflow validation
- **Test Case Design:** Precise element locators, test data sets, validation criteria

### Tool Assignment in Test Cases
- **Functional Test Cases:** Playwright (automated) or Manual execution
- **Security Test Cases:** OWASP ZAP (automated security scanning)
- **Performance Test Cases:** K6 + Performance Analyzer (load testing)
- **Accessibility Test Cases:** Google Lighthouse (accessibility audits)
- **Cross-Browser Test Cases:** Playwright (multi-browser automation)

### Test Case Attributes
Each test case should specify:
- **Execution Tool:** Which tool will execute this test case
- **Automation Status:** Automated (tool name) or Manual
- **Priority:** P1/P2 test cases must specify automation tool
- **Deliverable:** Expected report/output from tool execution

## Notes
- Always prioritize competition scoring criteria (20 points)
- Build upon both Test Plan and Test Analysis foundations consistently
- Apply appropriate test design techniques for comprehensive coverage
- Ensure test cases are executable with specified tools
- Maintain complete traceability throughout the document chain
- Focus on high-risk features identified in previous documents
- **P1/P2 test cases MUST specify automation tool (Playwright, OWASP ZAP, K6)**
- Reference the Competition Toolstack for tool assignment per test case type
- Document tool usage to demonstrate systematic approach (scoring criterion)

---

**Prompt Version**: 2.0  
**Created**: January 2025  
**Last Updated**: October 2025  
**Purpose**: ISTQB Testing Cup Test Design Generation  
**Dependencies**: Test Plan Document, Test Analysis Document, SUT Overview, PROJECT-SYSTEM-MESSAGE.md, test-design-knowledge-base.md, Playwright MCP

## Version History

### Version 2.0 (October 2025)
- **CRITICAL FIX:** Added HTML file generation strategy (batch generation to avoid token limits)
- **CRITICAL FIX:** Added character encoding guidelines (no emoji/Unicode symbols)
- **CRITICAL FIX:** Updated competition schedule to single-day format (6 hours total)
- **NEW:** Added comprehensive Competition Toolstack section
  - OWASP ZAP for security test case design
  - Google Lighthouse for accessibility test cases
  - K6 + Performance Analyzer for load test case design
  - Playwright for automated test case implementation (P1/P2 MUST be automated)
  - Cursor, Claude, n8n for test case design automation
  - Playwright MCP for detailed UI analysis
- Added tool assignment requirements for each test case type
- Added test case attribute specifications (execution tool, automation status, priority)
- Added clear instructions for morning/afternoon session breakdown
- Clarified external stakeholders (ISTQB Product Owner only)
- Improved time management guidelines for realistic competition constraints

### Version 1.0 (January 2025)
- Initial Test Design Generation Prompt
- Test design techniques application
- Detailed test case specifications




