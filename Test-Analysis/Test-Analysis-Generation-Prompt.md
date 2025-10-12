# Test Analysis Generation Kick-Off Prompt

## Purpose
This prompt enables automated generation of comprehensive Test Analysis documents for ISTQB Testing Cup competition, building upon the Test Plan foundation to create detailed test conditions and scenarios.

## When to Use This Prompt
Use this prompt when you need to:
- Generate Test Analysis document for ISTQB Testing Cup competition
- Create detailed test conditions based on Test Plan foundation
- Maximize scoring points (20/20) in Test Analysis and Design category
- Deliver professional, competition-ready documentation with focus on high-risk features

## Required Inputs
To use this prompt, provide:
1. **Test Plan Document** - Previously generated Test Plan (foundation document)
2. **SUT Overview Document** - Original SUT analysis for reference
3. **SUT URL** - The web application URL for targeted data gathering
4. **Login Credentials** (if required):
   - Username
   - Password
5. **Competition Context**:
   - Team Name: Automation Aid
   - Team Lead: Slav Astinov
   - Test Lead: Sava Barbarov
   - Event: ISTQB Testing Cup Grand Finals
   - Date: October 20th, 2025
   - Location: Copenhagen, Denmark
6. **⚠️ CRITICAL - Competition Day Schedule:**
   - **Competition Date:** October 20, 2025 (SINGLE DAY EVENT)
   - **Morning Session (09:00 - 12:00):** Test planning, analysis, and design
   - **Lunch Break (12:00 - 13:00):** DO NOT include in schedule
   - **Afternoon Session (13:00 - 16:00):** Test implementation, execution, and reporting
   - **Judges' Debriefing (16:00 - 17:00):** DO NOT include in schedule
   - **IMPORTANT:** All testing activities must fit within the 6-hour window (3 hours morning + 3 hours afternoon)
   - **External Stakeholders:** Only the Product Owner provided by ISTQB (no other external parties should be listed)

## ⚠️ CRITICAL: Understanding Reference Documents vs Actual System Exploration

**IMPORTANT DISTINCTION:**
- **Test Plan Document:** Use ONLY for structure, format, risks identified, and HTML design reference
- **Playwright MCP Exploration:** MANDATORY for gathering actual test condition data from the live system

**You MUST do BOTH:**
1. ✅ Use Test Plan for risk priorities, scope, and document structure reference
2. ✅ Use Playwright MCP to explore the actual system and gather specific test condition data

**What this means:**
- DON'T just extrapolate test conditions from the Test Plan alone
- DO explore the live system and document actual workflows, field names, validation messages
- DO use Test Plan as foundation, but enhance with real system observations
- DO document actual UI elements, error messages, and system behavior you observe

## Process Overview
The Test Analysis generation follows this systematic approach:

### Phase 1: Foundation Analysis
- Analyze Test Plan document for scope, risks, and priorities (REFERENCE ONLY)
- Reference PROJECT-SYSTEM-MESSAGE.md for Test Analysis scoring criteria
- Review Test Analysis Knowledge Base for document structure requirements (TEMPLATE ONLY)
- Identify high-risk features requiring detailed Playwright MCP exploration

### Phase 2: Targeted Data Gathering (MANDATORY - ACTUAL SYSTEM)
- ⚠️ Use Playwright MCP to gather specific Test Analysis data from LIVE SUT
- Focus on high-risk features and critical functionality
- Observe actual workflows, buttons, fields, error messages
- Capture detailed test conditions based on real system behavior
- Document traceability and prioritization requirements
- Record specific UI elements and validation rules you encounter

### Phase 3: Test Analysis Document Generation
- Create comprehensive Test Analysis following knowledge base structure (from Phase 1)
- Use actual data gathered from Playwright MCP exploration (from Phase 2)
- Optimize content for ISTQB competition scoring (20 points)
- Generate professional HTML output using Test Plan design as reference
- Ensure focus on high-risk features with well-defined, specific test conditions

## Detailed Process Instructions

### Step 1: Foundation Analysis & Preparation
```
1. Read and analyze the Test Plan document (foundation from previous generation)
2. Review PROJECT-SYSTEM-MESSAGE.md for Test Analysis scoring criteria:
   - Focus on high-risk features
   - Well-defined test conditions, cases, and charters
   - Prioritization and traceability
   - Avoid missing basic tests or designing more than executing
3. Reference Test-Analysis/test-analysis-knowledge-base.md for document structure
4. Cross-reference with SUT Overview for comprehensive system understanding
5. Identify high-risk features from Test Plan for detailed analysis focus
```

### Step 2: Targeted Playwright MCP Exploration ⚠️ MANDATORY
```
⚠️ CRITICAL: This step is MANDATORY and MUST be executed even if Test Plan exists.
   Test Plan provides RISK PRIORITIES only - you MUST explore actual system for test conditions.

1. **Open Playwright MCP** and navigate to SUT using provided URL and credentials
2. **Systematically explore high-risk modules** identified in Test Plan:
   - Authentication: Try login with valid/invalid credentials, observe error messages
   - Employee Management: Navigate to PIM, try adding employee, note actual field names
   - Leave Management: Explore leave request process, document actual workflow steps
   - Time Tracking: Test punch in/out, observe actual buttons and validation
3. **Document specific test condition data** as you explore:
   - Actual button labels (e.g., "Add Employee" not generic "Add" button)
   - Real field names (e.g., "First Name", "Employee Id" - exact spelling/case)
   - Actual error messages (e.g., "First Name is required" not generic validation)
   - Real workflow steps (e.g., exact clicks needed: Dashboard → PIM → Add → Save)
   - Validation rules you observe (e.g., Employee ID must be unique, dates format)
   - Boundary conditions (e.g., max field length, date ranges)
4. **Capture evidence** from your exploration:
   - Screenshots of forms with field names visible
   - Screenshots of error messages
   - Note workflow state transitions
   - Document actual data that exists (employee count, leave types, etc.)
5. **Create specific test conditions** based on observations:
   - "Verify 'First Name' field displays error 'First Name is required' when left empty"
   - NOT generic: "Verify required field validation"
6. **Document test data requirements**:
   - What test data you'll need based on actual system constraints
   - Existing demo data you can use
   - Edge cases and boundary values you discovered

⚠️ DO NOT skip this step. Test Plan has risks; you need actual system data for test conditions.
```

### Step 3: Test Analysis Document Generation
```
1. Create comprehensive Test Analysis document addressing all scoring criteria:
   - High-risk feature focus with detailed analysis
   - Well-defined test conditions and scenarios
   - Clear prioritization framework
   - Complete traceability to requirements and risks
   - Executable test scenarios (not over-designed)
2. Structure content according to test-analysis-knowledge-base.md
3. Generate HTML output using Documents/template.html design
4. Include competition context and team information
5. Ensure professional, competition-ready presentation
```

## Test Analysis Scoring Optimization

### Critical Success Factors (20 Points)
**Focus on High-Risk Features:**
- Prioritize analysis of critical business functions
- Identify failure points and potential impact areas
- Concentrate on areas with highest business risk
- Demonstrate risk-based analysis approach

**Well-Defined Test Conditions, Cases, and Charters:**
- Create clear, actionable test conditions
- Define comprehensive test cases for each scenario
- Develop exploratory test charters for complex areas
- Ensure all test conditions are specific and measurable

**Prioritization and Traceability:**
- Establish clear prioritization framework (risk-based)
- Maintain complete traceability to Test Plan risks
- Link test conditions to business requirements
- Document coverage analysis and gaps

**Avoid Penalty Points:**
- Include all basic/essential tests (don't miss fundamentals)
- Design realistic, executable scenarios
- Avoid over-designing beyond execution capabilities
- Balance comprehensive coverage with practical execution

## Document Structure Requirements

### Based on Test-Analysis Knowledge Base
1. **Requirements Analysis** - Detailed requirements understanding
2. **Test Data Gathering** - Comprehensive test data identification
3. **Use Case Analysis** - Business scenario analysis
4. **Risk-Based Analysis** - High-risk feature focus
5. **Test Scenario Development** - Detailed scenario creation
6. **Coverage Analysis** - Comprehensive coverage assessment
7. **Traceability Matrix** - Requirements to test conditions mapping
8. **Prioritization Framework** - Risk-based prioritization
9. **Test Condition Definition** - Clear, actionable conditions
10. **Validation Criteria** - Success/failure criteria definition

### HTML Output Requirements
- **Template:** Use Documents/template.html design
- **Header:** Include team information and competition context
- **Design Consistency:** Professional, competition-ready appearance
- **Content Structure:** Adapt template sections for Test Analysis content
- **Visual Elements:** Traceability matrices, risk tables, scenario flows
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

## Integration with Test Plan Foundation

### Building Upon Test Plan
- **Scope Alignment:** Ensure analysis covers Test Plan scope
- **Risk Focus:** Deep dive into Test Plan identified risks
- **Methodology Consistency:** Follow Test Plan testing approach
- **Resource Alignment:** Consider Test Plan resource constraints
- **Timeline Integration:** Align analysis with Test Plan schedule

### Traceability Requirements
- **Test Plan Risks → Test Analysis Conditions**
- **Test Plan Scope → Test Analysis Coverage**
- **Test Plan Objectives → Test Analysis Scenarios**
- **Test Plan Resources → Test Analysis Complexity**

## Quality Assurance Checklist

### Pre-Generation Validation
- ✅ Test Plan document analyzed thoroughly
- ✅ High-risk features identified from Test Plan
- ✅ Competition scoring criteria understood
- ✅ Knowledge base structure reviewed
- ✅ Playwright MCP exploration plan defined

### Post-Generation Validation
- ✅ All 20 scoring points addressed comprehensively
- ✅ High-risk features receive detailed analysis
- ✅ Test conditions are well-defined and actionable
- ✅ Prioritization and traceability are complete
- ✅ Basic tests are not missed
- ✅ Design is realistic and executable
- ✅ Professional HTML presentation achieved
- ✅ Team and competition context included

## Success Criteria

### Competition Scoring Targets
- **Test Analysis and Design: 20/20 points**
  - Focus on high-risk features: Comprehensive analysis
  - Well-defined test conditions, cases, and charters: Clear and actionable
  - Prioritization and traceability: Complete mapping
  - No penalty points for missing basic tests or over-designing

### Quality Indicators
- ✅ Professional, competition-ready documentation
- ✅ High-risk features receive priority focus
- ✅ Test conditions are specific and measurable
- ✅ Complete traceability to Test Plan foundation
- ✅ Risk-based prioritization throughout
- ✅ Executable and realistic test scenarios
- ✅ ISTQB best practices demonstrated

## Example Usage
```
User Input:
- Test Plan Document: [Previously generated Test Plan]
- SUT Overview: [Original SUT analysis document]
- SUT URL: https://example-sut.com
- Username: admin
- Password: admin123
- Competition Context: ISTQB Testing Cup Grand Finals

Expected Output:
- Comprehensive Test Analysis HTML document
- 20/20 scoring optimization
- High-risk feature focus
- Well-defined test conditions and scenarios
- Complete traceability and prioritization
```

## Integration with Subsequent Documents
The Test Analysis document serves as foundation for:
- **Test Design Generation** - Provides detailed test conditions for test case design
- **Test Execution** - Guides actual test scenario execution
- **Test Reporting** - Establishes criteria for success/failure determination

## Competition Toolstack

### Testing Tools (Use in Test Analysis Documentation)
When defining test conditions and scenarios, reference the following tools based on the testing type:

#### **1. Security & Penetration Testing**
- **Tool:** OWASP ZAP
- **Usage:** Exploratory security testing using spiders, active/passive scanning, request manipulation
- **Analysis Focus:** Security vulnerabilities, authentication/authorization flaws, injection attacks
- **Test Conditions:** Define security test scenarios for OWASP ZAP execution

#### **2. Accessibility Testing**
- **Tool:** Google Lighthouse
- **Usage:** Automated accessibility audits, WCAG compliance validation
- **Analysis Focus:** Accessibility compliance, screen reader compatibility, keyboard navigation
- **Test Conditions:** Define accessibility test scenarios for Lighthouse audits

#### **3. Load & Performance Testing**
- **Tool:** K6 + Performance Analyzer Addon
- **Usage:** Load testing scripts, performance benchmarking, stress testing
- **Analysis Focus:** Response time, throughput, scalability, resource utilization
- **Test Conditions:** Define performance test scenarios with load profiles

#### **4. Test Automation**
- **Tool:** Playwright
- **Usage:** Automated functional test scripts for high-priority scenarios
- **Analysis Focus:** Critical user journeys, regression scenarios, cross-browser workflows
- **Test Conditions:** Identify high-priority test conditions for automation (P1/P2)

#### **5. Workflow & Documentation**
- **Tools:** Cursor, Claude, n8n
- **Usage:** AI-assisted test analysis, workflow automation, intelligent test condition generation
- **Analysis Focus:** Test condition optimization, traceability management, analysis documentation

#### **6. System Under Test Exploration**
- **Tool:** Playwright MCP (Model Context Protocol)
- **Usage:** Detailed feature exploration, workflow analysis, data validation
- **Analysis Focus:** High-risk feature identification, business workflow understanding

### Tool Application in Test Analysis
- **Test Conditions:** Define specific test conditions that leverage appropriate tools
- **Traceability:** Link test conditions to tools that will execute them
- **Prioritization:** High-risk conditions should specify automation tools (Playwright, OWASP ZAP, K6)
- **Coverage:** Ensure test conditions cover all testing types (functional, security, performance, accessibility)

## Notes
- Always prioritize competition scoring criteria (20 points)
- Build upon Test Plan foundation consistently
- Focus on high-risk features identified in Test Plan
- Ensure test conditions are actionable and executable with specified tools
- Maintain complete traceability throughout
- Reference the Competition Toolstack when defining test conditions
- Specify which tool will be used for each test condition type

---

**Prompt Version**: 2.1  
**Created**: January 2025  
**Last Updated**: January 2026  
**Purpose**: ISTQB Testing Cup Test Analysis Generation  
**Dependencies**: Test Plan Document, SUT Overview, PROJECT-SYSTEM-MESSAGE.md, test-analysis-knowledge-base.md, Playwright MCP

## Version History

### Version 2.1 (January 2026)
- **CRITICAL CLARIFICATION:** Added explicit distinction between Test Plan reference and actual system exploration
- **CRITICAL FIX:** Made Playwright MCP exploration MANDATORY with clear warning labels
- Added "Understanding Reference Documents vs Actual System Exploration" section
- Enhanced Step 2 with specific examples of what to document during exploration
- Emphasized need to capture ACTUAL field names, error messages, button labels
- Added examples of specific vs generic test conditions
- Clarified that Test Plan provides risk priorities, Playwright MCP provides actual test condition details
- Emphasized that skipping Playwright MCP exploration results in generic, unusable test conditions

### Version 2.0 (October 2025)
- **CRITICAL FIX:** Added HTML file generation strategy (batch generation to avoid token limits)
- **CRITICAL FIX:** Added character encoding guidelines (no emoji/Unicode symbols)
- **CRITICAL FIX:** Updated competition schedule to single-day format (6 hours total)
- **NEW:** Added comprehensive Competition Toolstack section
  - OWASP ZAP for security test condition analysis
  - Google Lighthouse for accessibility test conditions
  - K6 + Performance Analyzer for performance test conditions
  - Playwright for automation-ready test conditions (P1/P2)
  - Cursor, Claude, n8n for analysis workflow automation
  - Playwright MCP for detailed feature exploration
- Added tool application guidance for test condition definition
- Added clear instructions for morning/afternoon session breakdown
- Clarified external stakeholders (ISTQB Product Owner only)
- Improved time management guidelines for realistic competition constraints

### Version 1.0 (January 2025)
- Initial Test Analysis Generation Prompt
- High-risk feature focus
- Traceability and prioritization framework




