# Test Plan Generation Kick-Off Prompt

## Purpose
This prompt enables automated generation of comprehensive Test Plan documents for ISTQB Testing Cup competition, following the systematic approach of live SUT exploration → Test Plan creation → HTML output.

## ⚠️ CRITICAL REQUIREMENT: HANDS-ON SYSTEM EXPLORATION IS MANDATORY
**You MUST use Playwright MCP to explore the LIVE application for every Test Plan generation.**
- The SUT Overview document is a REFERENCE GUIDE ONLY - it helps identify what to look for
- You MUST gather actual data by navigating, clicking, observing the real application
- Your Test Plan must reflect REAL data from LIVE exploration, not copied from reference documents

## When to Use This Prompt
Use this prompt when you need to:
- Generate Test Plan document for ISTQB Testing Cup competition
- Create strategic testing approach based on LIVE system exploration
- Maximize scoring points (20/20) in Test Plan Quality category
- Deliver professional, competition-ready documentation

## Required Inputs
To use this prompt, provide:
1. **SUT Overview Document** - OPTIONAL reference guide to help identify system areas (NOT for copying content)
2. **SUT URL** - MANDATORY - The web application URL for live hands-on exploration
3. **Login Credentials** (if required):
   - Username
   - Password
4. **Competition Context**:
   - Team Name: Automation Aid
   - Team Lead: Slav Astinov
   - Test Lead: Sava Barbarov
   - Event: ISTQB Testing Cup Grand Finals
   - Date: October 20th, 2025
   - Location: Copenhagen, Denmark
5. **⚠️ CRITICAL - Competition Day Schedule:**
   - **Competition Date:** October 20, 2025 (SINGLE DAY EVENT)
   - **Morning Session (09:00 - 12:00):** Test planning, analysis, and design
   - **Lunch Break (12:00 - 13:00):** DO NOT include in schedule
   - **Afternoon Session (13:00 - 16:00):** Test implementation, execution, and reporting
   - **Judges' Debriefing (16:00 - 17:00):** DO NOT include in schedule
   - **IMPORTANT:** All testing activities must fit within the 6-hour window (3 hours morning + 3 hours afternoon)
   - **External Stakeholders:** Only the Product Owner provided by ISTQB (no other external parties should be listed)

## ⚠️ CRITICAL: Understanding Reference Documents vs Actual System Exploration

**THINK OF IT THIS WAY:**

**Reference Documents = Learning to Ride a Bike by Reading a Manual**
- SUT Overview = Someone else's description of their bike ride
- Knowledge Base = Instructions on how to write about bike riding
- Template = Format for presenting your bike ride story
- **YOU CAN'T LEARN TO RIDE BY READING THESE!**

**Playwright MCP Exploration = ACTUALLY RIDING THE BIKE YOURSELF**
- You get on the bike (open the application)
- You pedal and steer (click buttons, fill forms)
- You feel bumps and turns (encounter errors, observe workflows)
- You see the scenery (observe UI, data, navigation)
- **THIS IS THE ONLY WAY TO LEARN!**

═══════════════════════════════════════════════════════════════════════════════

**YOUR TASK BREAKDOWN:**

1. Reference Documents (5 minutes) = Learn STRUCTURE
   - "Oh, I should organize my Test Plan into these sections"
   - "I should document risks in a table format"
   - "I need to include scope, schedule, and resources"
   - **NEVER COPY SENTENCES OR DETAILS FROM THESE**

2. Playwright MCP Exploration (30-45 minutes) = Gather CONTENT
   - "I see 6 user accounts in the Admin module"
   - "The Leave form requires a 'From Date' field"
   - "Risk: I couldn't find password strength validation"
   - **EVERY DETAIL IN YOUR TEST PLAN COMES FROM HERE**

3. Document Generation (remaining time) = Combine STRUCTURE + CONTENT
   - Use the section organization from reference docs
   - Fill with observations from your live exploration
   - Write in your own words based on what you saw

═══════════════════════════════════════════════════════════════════════════════

**ABSOLUTE RULES:**
- ❌ DO NOT copy module descriptions from SUT Overview
- ❌ DO NOT copy risk lists from reference documents
- ❌ DO NOT assume anything exists without seeing it live
- ✅ DO explore every module hands-on with Playwright MCP
- ✅ DO document only what you personally observed
- ✅ DO use reference docs to understand document structure only

## Process Overview
The Test Plan generation follows this systematic approach:

### Phase 1: Reference Material Review (STRUCTURE/TEMPLATE REFERENCE ONLY)
**Purpose:** Learn HOW to structure and present your findings (NOT what to write)
- SUT Overview document → Understand what system areas exist (don't copy content)
- PROJECT-SYSTEM-MESSAGE.md → Understand competition scoring criteria
- Test Plan Knowledge Base → Learn document structure and section organization
- Template.html → Reference visual design and CSS styling
**Output:** Understanding of document structure, formatting, and scoring criteria

### Phase 2: Live System Exploration (MANDATORY - PRIMARY DATA SOURCE)
**Purpose:** Gather ALL actual data for your Test Plan through hands-on exploration
- ⚠️ **CRITICAL:** Use Playwright MCP to navigate and explore the LIVE application
- Click through every module: Admin, PIM, Leave, Time, Recruitment, Performance, etc.
- Document what YOU see: button labels, field names, error messages, workflows
- Identify risks by observing critical functions and potential failure points
- Test workflows by actually performing actions in the system
- Record real data: employee counts, user roles, menu structures, validation rules
- Estimate complexity and testing time based on your hands-on experience
**Output:** Real, first-hand data gathered from actual system interaction

### Phase 3: Test Plan Document Generation (COMBINE PHASE 1 STRUCTURE + PHASE 2 DATA)
**Purpose:** Write Test Plan using structure from Phase 1 and data from Phase 2
- Use document structure template learned in Phase 1
- Fill sections with REAL data gathered in Phase 2 (not from reference docs)
- Include actual field names, buttons, workflows observed during exploration
- Document risks identified through hands-on testing
- Create realistic timeline based on observed system complexity
- Generate professional HTML output using template design
**Output:** Professional Test Plan with authentic, verified information

## Detailed Process Instructions

### Step 1: Reference Material Review (Quick 5-minute scan for structure only)
```
PURPOSE: Understand document structure and scoring - DO NOT copy content from these files

1. Scan SUT Overview document (if available):
   - Note what modules/features exist (e.g., Admin, PIM, Leave)
   - Use this as a CHECKLIST of areas to explore live
   - DO NOT copy descriptions or details
   
2. Review PROJECT-SYSTEM-MESSAGE.md for scoring criteria:
   - Coverage of product risks (you'll identify these in Step 2)
   - Clear scope and realistic time management
   - Use of tools and systematic approach
   
3. Reference test-plan-knowledge-base.md for document structure:
   - Learn section headings and organization
   - Understand what information goes in each section
   - Note the HTML template design patterns
   
4. Create exploration checklist for Step 2:
   - List all modules/features to explore live
   - Note critical areas for risk identification
   - Plan your hands-on testing approach
```

### Step 2: Live System Exploration with Playwright MCP ⚠️ MANDATORY - PRIMARY DATA GATHERING
```
═══════════════════════════════════════════════════════════════════════════════
⚠️⚠️⚠️ ABSOLUTE REQUIREMENT - THIS IS YOUR PRIMARY DATA SOURCE ⚠️⚠️⚠️
═══════════════════════════════════════════════════════════════════════════════

This is NOT optional exploration. This IS your Test Plan research.
Everything you write in the Test Plan MUST come from this hands-on exploration.

THE ONLY WAY TO COMPLETE THIS TASK:
1. Open Playwright MCP browser
2. Navigate to the live application
3. Click, explore, test, and document EVERYTHING you see
4. Write your Test Plan based on YOUR DIRECT OBSERVATIONS

═══════════════════════════════════════════════════════════════════════════════

**STEP-BY-STEP HANDS-ON EXPLORATION:**

1. **Login and Initial Navigation** (5 minutes)
   - Navigate to SUT URL using provided credentials
   - Observe the login process, note any validation rules
   - Document actual error messages if wrong credentials entered
   - Explore the dashboard/home page layout

2. **Module-by-Module Deep Dive** (20-30 minutes)
   For EACH module (Admin, PIM, Leave, Time, Recruitment, Performance, etc.):
   
   a) CLICK on the module and observe:
      - What submenu items appear?
      - What are the ACTUAL button labels? (e.g., "Add", "Search", "Reset")
      - What are the ACTUAL field names? (e.g., "Employee Name", "From Date")
      - What dropdowns exist and what options do they show?
   
   b) TEST basic workflows:
      - Try to add a record (don't save, just observe the form)
      - Try to search/filter records
      - Try to edit an existing record
      - Note any validation rules or error messages
   
   c) IDENTIFY risks by asking:
      - What could go wrong here? (e.g., data loss, unauthorized access)
      - What's business-critical? (e.g., payroll data, employee records)
      - What dependencies exist? (e.g., can't assign leave without employee)
      - What validation could fail? (e.g., date ranges, required fields)
   
   d) DOCUMENT real data:
      - How many records exist? (e.g., "110 employee records found")
      - What user roles are present? (e.g., "Admin", "ESS" roles seen)
      - What's the actual navigation structure?

3. **Workflow Testing** (10 minutes)
   - Complete 2-3 end-to-end workflows:
     Example: Login → Navigate to PIM → Search for employee → View details
     Example: Go to Leave → Apply for leave → Note approval workflow
   - Document each step and observation
   - Note complexity and time required

4. **Risk Identification Through Exploration** (10 minutes)
   Based on what you ACTUALLY SAW:
   - Authentication risks: What happens with wrong password? Session timeout?
   - Data integrity risks: Can you delete records? What validations exist?
   - Authorization risks: Can you access admin functions as regular user?
   - Business process risks: What if leave approval fails? Data exports?

5. **Document Your Findings in Detail:**
   Create notes with REAL observations:
   - "I clicked Admin → User Management and saw a table with 6 system users"
   - "The search form has fields: Username, User Role, Employee Name, Status"
   - "I observed employee records have IDs in various formats: numeric and alphanumeric"
   - "Leave module requires 'Show Leave with Status' field (marked with *)"
   - "Risk identified: No visible password strength requirements on user creation"

⚠️⚠️⚠️ CRITICAL REMINDERS ⚠️⚠️⚠️
- Spend 30-45 minutes actually using the system
- Take notes on EVERYTHING you observe
- Every sentence in your Test Plan should trace back to something you SAW
- If you didn't explore it live, don't write about it
- Reference documents are for structure ONLY - not for content

═══════════════════════════════════════════════════════════════════════════════
```

### Step 3: Test Plan Document Generation
```
1. Create comprehensive Test Plan document addressing all scoring criteria:
   - Executive Summary with risk-based approach
   - Detailed scope covering all critical system areas
   - Realistic timeline with proper resource allocation
   - Systematic methodology with tool integration
   - Risk coverage and mitigation strategies
2. Structure content according to test-plan-knowledge-base.md
3. Generate HTML output using Documents/template.html design in BATCHES:
   ⚠️ CRITICAL: Generate HTML in multiple batch writes to avoid token limits
   
   BATCH 1: HTML structure + Header + Metadata + Table of Contents
   - <!DOCTYPE html> through <head> section with all CSS styles
   - Header section with team information
   - Metadata grid with competition context
   - Table of Contents section
   
   BATCH 2: Introduction + Test Scope + Test Approach sections
   - Section 1: Introduction (Purpose, Objectives, SUT Overview)
   - Section 2: Test Scope (In-Scope, Out-of-Scope items)
   - Section 3: Test Approach (Test Levels, Techniques, Tools)
   
   BATCH 3: Risk Assessment + Schedule sections
   - Section 4: Risk Assessment (Risk matrix, Mitigation strategies)
   - Section 5: Test Schedule (Timeline, Milestones, Activities)
   
   BATCH 4: Resources + Deliverables + Closing sections
   - Section 6: Test Resources (Team, Tools, Environment)
   - Section 7: Test Deliverables
   - Section 8: Entry/Exit Criteria
   - Footer with approval table and revision history
   - Closing </body></html> tags
   
   File naming: '[Team Name] - Test Plan.html' (e.g., 'Automation Aid - Test Plan.html')
   
   NOTE: Screenshots are NOT required - focus on text-based documentation
   
4. Include competition context and team information in metadata grid for all documents to ensure team identification
5. Ensure professional, competition-ready presentation
```

## Test Plan Scoring Optimization

### Critical Success Factors (20 Points)
- **Coverage of Product Risks:** Identify and document all critical business risks, prioritize based on impact and likelihood, include mitigation strategies
- **Clear Scope and Realistic Time Management:** Define precise in-scope and out-of-scope functionality, create realistic timeline based on 6-hour competition schedule (3 hours morning + 3 hours afternoon), allocate appropriate resources
- **Use of Tools and Systematic Approach:** Document comprehensive toolstack usage for all testing activities

## Competition Toolstack

### Testing Tools (Use in Test Plan Documentation)
When documenting the testing approach, reference the following tools based on the testing type:

#### **1. Security & Penetration Testing**
- **Tool:** OWASP ZAP
- **Usage:** Exploratory security testing using spiders, active/passive scanning, and request manipulation
- **Deliverable:** Security test report generated from OWASP ZAP (published to project folder)
- **Application:** Security testing section, risk mitigation for authentication/authorization vulnerabilities

#### **2. Accessibility Testing**
- **Tool:** Google Lighthouse
- **Usage:** Automated accessibility audits, WCAG compliance validation, performance insights
- **Deliverable:** Lighthouse accessibility report with scores and recommendations
- **Application:** Accessibility testing section, usability validation, compliance verification

#### **3. Load & Performance Testing**
- **Tool:** K6 + Performance Analyzer Addon
- **Usage:** Load testing scripts, performance benchmarking, stress testing scenarios
- **Deliverable:** K6 performance test report with metrics and analysis (published to project folder)
- **Application:** Performance testing section, scalability validation, bottleneck identification

#### **4. Test Automation**
- **Tool:** Playwright
- **Usage:** Automated functional test scripts for high-priority test cases
- **Deliverable:** Playwright test scripts published to GitHub repository
- **Application:** Test automation section, regression testing, cross-browser validation
- **Priority:** High-priority (P1) test cases to be automated

#### **5. Workflow & Documentation**
- **Tools:** Cursor, Claude, n8n
- **Usage:** 
  - **Cursor + Claude:** AI-assisted test documentation generation, test case design, intelligent analysis
  - **n8n:** Workflow automation for test execution pipelines, report generation, CI/CD integration
- **Application:** Test management, documentation automation, workflow orchestration

#### **6. System Under Test Exploration**
- **Tool:** Playwright MCP (Model Context Protocol)
- **Usage:** Systematic SUT exploration, UI interaction, data gathering, screenshot capture
- **Application:** SUT analysis, test data preparation, exploratory testing automation

### Tool Integration Strategy
- **Multiple Test Types:** Use appropriate tools for each testing level (functional, security, performance, accessibility)
- **Systematic Approach:** Document tool usage rationale and expected outcomes
- **Report Generation:** All tools generate professional reports for evidence and analysis
- **Automation Priority:** Focus automation on high-risk, high-priority test scenarios

## Quality Assurance Checklist

### Pre-Generation Validation
- ✅ SUT Overview document analyzed thoroughly
- ✅ Competition scoring criteria understood
- ✅ Knowledge base structure reviewed
- ✅ Playwright MCP exploration plan defined

### Post-Generation Validation
- ✅ All 20 scoring points addressed comprehensively
- ✅ Risk coverage is thorough and prioritized
- ✅ Scope is clear and realistic
- ✅ Timeline is achievable and well-structured
- ✅ Tool usage is documented and justified
- ✅ Professional HTML presentation achieved
- ✅ Team and competition context included
- ✅ No self-promotional quotes or scoring claims in footer (e.g., remove 'optimized for 20/20')

## Success Criteria

### Competition Scoring Targets
- **Test Plan Quality: 20/20 points**
  - Coverage of product risks: Comprehensive
  - Clear scope and realistic time management: Achievable
  - Use of tools and systematic approach: Well-documented
  - No penalty points for single test type focus or unworkable schedules

### Quality Indicators
- ✅ Professional, competition-ready documentation
- ✅ Comprehensive risk identification and mitigation
- ✅ Realistic and achievable project timeline
- ✅ Clear scope definition with proper boundaries
- ✅ Systematic approach with tool integration
- ✅ ISTQB best practices demonstrated throughout

## Example Usage
```
User Input:
- SUT Overview: [Generated document or reference file]
- SUT URL: https://example-sut.com
- Username: admin
- Password: admin123
- Competition Context: ISTQB Testing Cup Grand Finals

Expected Output:
- Comprehensive Test Plan HTML document
- Meets all scoring targets via [list]
- Professional competition presentation
- Risk-based strategic approach
- Realistic timeline and resource allocation
```

## Integration with Subsequent Documents
The Test Plan document serves as foundation for:
- **Test Analysis Generation** - Provides scope and risk priorities
- **Test Design Generation** - Establishes methodology and approach
- **Test Execution** - Guides actual testing activities

## Notes
- Always prioritize competition scoring criteria (20 points)
- Maintain professional ISTQB standards throughout
- Ensure all recommendations are practical and executable
- Focus on comprehensive risk coverage and realistic planning
- Reference the Competition Toolstack for appropriate tool selection per testing type
- Document tool usage to demonstrate systematic approach (scoring criterion)
- Ensure generated doc uses measurable criteria (e.g., 'Response time < 3s per K6 metrics') to avoid ambiguities

---

**Prompt Version**: 2.4  
**Created**: January 2025  
**Last Updated**: October 18, 2025  
**Purpose**: ISTQB Testing Cup Test Plan Generation  
**Dependencies**: Playwright MCP (MANDATORY), test-plan-knowledge-base.md (structure reference), SUT Overview (optional reference)

## Version History

### Version 2.4 (October 18, 2025)
- **MAJOR CLARIFICATION:** Dramatically strengthened mandatory Playwright MCP exploration requirements
- **CRITICAL CHANGE:** Repositioned SUT Overview as OPTIONAL reference guide (not required input)
- **NEW SECTION:** Added prominent "HANDS-ON SYSTEM EXPLORATION IS MANDATORY" warning at top
- **ENHANCED:** Completely rewrote Phase descriptions to emphasize live exploration as primary data source
- **RESTRUCTURED Step 1:** Now "Reference Material Review" - explicitly 5-minute scan for structure only
- **COMPLETELY REWROTE Step 2:** Now 30-45 minute hands-on exploration guide with:
  - Visual separators and triple warning symbols (⚠️⚠️⚠️)
  - Step-by-step exploration instructions (Login → Module Deep Dive → Workflow Testing → Risk ID)
  - Concrete examples of observations to document
  - Explicit time allocations for each exploration activity
  - Clear reminders that reference docs are for structure ONLY
- **NEW EMPHASIS:** "Everything in Test Plan MUST come from hands-on exploration"
- **PURPOSE:** Eliminate any possibility of copying from reference documents instead of exploring live

### Version 2.3 (October 18, 2025)
- **CRITICAL FIX:** Added batch HTML generation strategy to avoid token limits
  - BATCH 1: HTML structure + Header + Metadata + TOC
  - BATCH 2: Introduction + Scope + Approach
  - BATCH 3: Risk Assessment + Schedule
  - BATCH 4: Resources + Deliverables + Closing
- Removed screenshot requirements from Playwright MCP exploration
- Streamlined evidence capture to focus on text-based documentation

### Version 2.2 (October 18, 2025)
- Added filename prefix '[Team Name] – Test Plan.html' to HTML Output Requirements
- Reinforced metadata grid inclusion for team identification
- Removed self-promotional phrases from scoring optimization and success criteria
- Added time estimates in Playwright MCP exploration to validate 6-hour fit
- Cross-referenced risks/tools to reduce repetition in subsequent docs

### Version 2.1 (January 2026)
- **CRITICAL CLARIFICATION:** Added explicit distinction between reference documents and actual system exploration
- **CRITICAL FIX:** Made Playwright MCP exploration MANDATORY with clear warning labels
- Added "Understanding Reference Documents vs Actual System Exploration" section
- Enhanced Step 2 with detailed Playwright MCP exploration checklist
- Clarified that reference documents are for STRUCTURE/TEMPLATE only, not actual data
- Added explicit instructions to document actual UI elements, field names, error messages
- Emphasized that skipping Playwright MCP exploration is NOT acceptable

### Version 2.0 (October 2025)
- **CRITICAL FIX:** Added HTML file generation strategy (batch generation to avoid token limits)
- **CRITICAL FIX:** Added character encoding guidelines (no emoji/Unicode symbols)
- **CRITICAL FIX:** Updated competition schedule to single-day format (6 hours total)
- **NEW:** Added comprehensive Competition Toolstack section
  - OWASP ZAP for security/penetration testing
  - Google Lighthouse for accessibility testing
  - K6 + Performance Analyzer for load/performance testing
  - Playwright for test automation (P1 priority)
  - Cursor, Claude, n8n for workflow automation
  - Playwright MCP for SUT exploration
- Added tool integration strategy and deliverable specifications
- Added clear instructions for morning/afternoon session breakdown
- Clarified external stakeholders (ISTQB Product Owner only)
- Improved time management guidelines for realistic competition constraints

### Version 1.0 (January 2025)
- Initial Test Plan Generation Prompt
- Core structure and scoring optimization
- ISTQB best practices integration