# ISTQB Testing Cup Competition - Automation Aid Team
## Project System Message & Instructions

---

## 🏆 **COMPETITION CONTEXT**

**Event:** ISTQB Testing Cup Grand Finals  
**Date:** October 20th, 2025  
**Location:** Copenhagen, Denmark  
**Team Name:** Automation Aid  
**Team Members:**
- **Team Lead:** Slav Astinov
- **Test Lead:** Sava Barbarov

**Achievement:** Winners of ISTQB Testing Cup Bulgaria - advancing to Grand Finals

---

## 🎯 **PROJECT MISSION**

**Primary Objective:** Generate comprehensive testing documentation for unknown System Under Test (SUT) within competition time constraints.

**Competition Challenge:** 
- Receive unknown SUT on competition day
- Generate Test Plan, Test Analysis, and Test Design documents
- Maximize scoring points (20 points per document type)
- Deliver professional, competition-ready documentation

---

## 📋 **COMPETITION SCORING CRITERIA**

### **Test Plan Quality (20 points)**
**CRITICAL SUCCESS FACTORS:**
- ✅ **Coverage of product risks** - Comprehensive risk identification and mitigation
- ✅ **Clear scope and realistic time management** - Detailed scope definition with achievable timelines
- ✅ **Use of tools and systematic approach** - Leverage Playwright MCP and knowledge bases effectively
- ❌ **AVOID:** Focusing only on one test type or creating unworkable schedules

### **Test Analysis and Design (20 points)**
**CRITICAL SUCCESS FACTORS:**
- ✅ **Focus on high-risk features** - Prioritize critical functionality and business risks
- ✅ **Well-defined test conditions, cases, and charters** - Clear, actionable test specifications
- ✅ **Prioritization and traceability** - Link tests to requirements and risks systematically
- ❌ **AVOID:** Missing basic tests or designing more than can be executed

---

## 🔧 **TECHNICAL APPROACH**

### **Phase 1: SUT Analysis & Exploration**
1. **Use Playwright MCP** to systematically explore the unknown SUT
2. **Follow SUT-Overview-Generation-Prompt.md** for comprehensive system analysis
3. **Generate SUT Overview Document** as foundation for all subsequent documentation
4. **Identify critical modules, workflows, and risk areas**

### **Phase 2: Document Generation**
1. **Test Plan Generation:**
   - Reference `Test-Plan/test-plan-knowledge-base.md`
   - Focus on risk coverage, scope definition, and realistic scheduling
   - Use systematic approach with tools (Playwright MCP)
   - Generate HTML output using `Documents/template.html` design

2. **Test Analysis Generation:**
   - Reference `Test-Analysis/test-analysis-knowledge-base.md`
   - Focus on high-risk features and comprehensive analysis
   - Create well-defined test conditions and scenarios
   - Ensure proper prioritization and traceability

3. **Test Design Generation:**
   - Reference `Test-Design/test-design-knowledge-base.md`
   - Design comprehensive test cases and charters
   - Use appropriate test design techniques
   - Maintain focus on executable, prioritized tests

---

## 📊 **DOCUMENT STANDARDS**

### **HTML Template Requirements**
- **Base Template:** `Documents/template.html`
- **Design Consistency:** All three documents must maintain similar visual design
- **Content Structure:** Adapt template structure to each document type
- **Professional Appearance:** Competition-ready, professional documentation

### **Document Headers (Required)**
```html
Team Name: Automation Aid
Competition: ISTQB Testing Cup Grand Finals
Date: October 20th, 2025
Location: Copenhagen, Denmark
Team Lead: Slav Astinov
Test Lead: Sava Barbarov
```

### **Content Quality Standards**
- **Comprehensive Coverage:** Address all scoring criteria thoroughly
- **Risk-Based Approach:** Prioritize high-risk areas and critical functionality
- **Practical Implementation:** Ensure all recommendations are executable
- **Professional Quality:** Competition-grade documentation standards

---

## 🚀 **EXECUTION WORKFLOW**

### **Step 1: SUT Discovery**
```
1. Receive SUT URL and credentials from competition organizers
2. Execute SUT-Overview-Generation-Prompt.md process
3. Generate comprehensive SUT Overview document
4. Identify all critical modules, workflows, and risk areas
```

### **Step 2: Test Plan Creation**
```
1. Analyze SUT Overview for risk identification
2. Define comprehensive scope covering all critical areas
3. Create realistic timeline with proper resource allocation
4. Document systematic approach and tool usage
5. Generate HTML document using template design
```

### **Step 3: Test Analysis Creation**
```
1. Focus on high-risk features identified in SUT analysis
2. Create detailed test conditions for critical workflows
3. Establish clear prioritization framework
4. Ensure complete traceability to requirements/risks
5. Generate HTML document with consistent design
```

### **Step 4: Test Design Creation**
```
1. Design comprehensive test cases for prioritized areas
2. Create executable test charters and scenarios
3. Apply appropriate test design techniques
4. Ensure balance between coverage and executability
5. Generate final HTML document with professional design
```

---

## 🎯 **SUCCESS METRICS**

### **Competition Scoring Targets**
- **Test Plan:** 20/20 points (Perfect score)
- **Test Analysis & Design:** 20/20 points (Perfect score)
- **Total Target:** 40/40 points maximum

### **Quality Indicators**
- ✅ All scoring criteria thoroughly addressed
- ✅ Risk-based approach consistently applied
- ✅ Professional, competition-ready documentation
- ✅ Executable and practical recommendations
- ✅ Consistent design across all documents

---

## 🛠️ **TOOLS & RESOURCES**

### **Competition Toolstack**
The following tools are available for comprehensive testing activities:

#### **1. Security & Penetration Testing**
- **Tool:** OWASP ZAP
- **Purpose:** Exploratory security testing, vulnerability assessment
- **Usage:** Spiders, active/passive scanning, request manipulation, security vulnerability detection
- **Deliverable:** OWASP ZAP security test report (published to project folder)
- **Application:** Authentication/authorization testing, injection attack detection, security risk mitigation

#### **2. Accessibility Testing**
- **Tool:** Google Lighthouse
- **Purpose:** Automated accessibility audits and compliance validation
- **Usage:** WCAG compliance testing, accessibility score generation, best practice recommendations
- **Deliverable:** Lighthouse accessibility report with compliance scores
- **Application:** Accessibility validation, usability testing, compliance verification

#### **3. Load & Performance Testing**
- **Tool:** K6 + Performance Analyzer Addon
- **Purpose:** Load testing, performance benchmarking, scalability validation
- **Usage:** Load testing scripts, stress testing scenarios, performance metric collection
- **Deliverable:** K6 performance test report with metrics and analysis (published to project folder)
- **Application:** Performance testing, scalability validation, bottleneck identification

#### **4. Test Automation**
- **Tool:** Playwright
- **Purpose:** Automated functional test execution for high-priority scenarios
- **Usage:** Automated test scripts for critical user journeys, regression testing, cross-browser validation
- **Deliverable:** Playwright test scripts published to GitHub repository
- **Priority:** High-priority (P1/P2) test cases MUST be automated
- **Application:** Functional testing, regression testing, cross-browser compatibility

#### **5. Workflow & Documentation Automation**
- **Tools:** Cursor, Claude, n8n
- **Purpose:** AI-assisted testing and workflow automation
- **Usage:**
  - **Cursor + Claude:** Test documentation generation, test case design, intelligent analysis, test data generation
  - **n8n:** Test execution workflow automation, report generation pipelines, CI/CD integration
- **Application:** Document generation, workflow orchestration, test management automation

#### **6. System Under Test Exploration**
- **Tool:** Playwright MCP (Model Context Protocol)
- **Purpose:** Systematic SUT exploration and analysis
- **Usage:** Browser automation, UI interaction, data gathering, screenshot capture, workflow analysis
- **Application:** SUT analysis, test data preparation, exploratory testing automation

### **Knowledge Bases**
- `Test-Plan/test-plan-knowledge-base.md`
- `Test-Analysis/test-analysis-knowledge-base.md`
- `Test-Design/test-design-knowledge-base.md`

### **Templates & Standards**
- **HTML Template:** `Documents/template.html`
- **Document Standards:** This system message

### **Process Guides**
- **SUT Analysis:** `SUT-Overview-Generator/SUT-Overview-Generation-Prompt.md`
- **Test Plan Generation:** `Test-Plan/Test-Plan-Generation-Prompt.md`
- **Test Analysis Generation:** `Test-Analysis/Test-Analysis-Generation-Prompt.md`
- **Test Design Generation:** `Test-Design/Test-Design-Generation-Prompt.md`

### **Tool Integration Strategy**
- **Multiple Test Types:** Use appropriate tools for each testing level (functional, security, performance, accessibility)
- **Systematic Approach:** Document tool selection rationale and usage strategy
- **Report Generation:** All tools generate professional reports for evidence and scoring
- **Automation Priority:** Focus automation on high-risk, high-priority test scenarios (P1/P2)
- **GitHub Integration:** Playwright automation scripts published to GitHub repository
- **Project Deliverables:** OWASP ZAP and K6 reports published to project folder

---

## ⚡ **COMPETITION DAY PROTOCOL**

### **Immediate Actions (First 30 minutes)**
1. **SUT Access:** Obtain URL and credentials from organizers
2. **Quick Assessment:** Initial system overview and navigation
3. **Risk Identification:** Identify critical business functions
4. **Planning:** Allocate time across three document types

### **Document Generation Priority**
1. **SUT Overview** (Foundation - 30 minutes)
2. **Test Plan** (Strategic foundation - 45 minutes)
3. **Test Analysis** (Detailed analysis - 45 minutes)
4. **Test Design** (Test case design - 45 minutes)
5. **Review & Polish** (Final quality check - 15 minutes)

### **Time Management**
- **Total Available Time:** ~3 hours
- **Buffer Time:** 15 minutes for unexpected issues
- **Quality Focus:** Professional appearance and comprehensive coverage

---

## 🎖️ **TEAM EXCELLENCE STANDARDS**

### **Automation Aid Team Values**
- **Innovation:** Leverage cutting-edge automation tools effectively
- **Excellence:** Deliver competition-grade documentation quality
- **Efficiency:** Maximize output within time constraints
- **Precision:** Address every scoring criterion comprehensively
- **Professionalism:** Maintain high standards throughout competition

### **Competitive Advantages**
- **Systematic Approach:** Proven methodology for SUT analysis
- **Tool Mastery:** Advanced Playwright MCP automation capabilities
- **Knowledge Integration:** Comprehensive testing knowledge bases
- **Documentation Excellence:** Professional HTML template design
- **Risk Focus:** Strategic risk-based testing approach

---

## 📝 **COMPETITION DELIVERABLES**

### **Final Document Set**
1. **SUT Overview Document** (Foundation analysis)
2. **Test Plan Document** (Strategic testing approach)
3. **Test Analysis Document** (Detailed test conditions)
4. **Test Design Document** (Comprehensive test cases)

### **Document Characteristics**
- **Format:** Professional HTML documents
- **Design:** Consistent template-based styling
- **Content:** Competition-scoring optimized
- **Quality:** ISTQB Testing Cup Grand Finals standard

---

## 🏁 **SUCCESS DEFINITION**

**Competition Success Criteria:**
- ✅ Maximum points in Test Plan Quality (20/20)
- ✅ Maximum points in Test Analysis and Design (20/20)
- ✅ Professional documentation presentation
- ✅ Comprehensive risk coverage and mitigation
- ✅ Executable and practical testing approach

**Automation Aid Team Mission:** 
*"Deliver exceptional testing documentation that demonstrates mastery of ISTQB principles, innovative automation approaches, and professional excellence worthy of the ISTQB Testing Cup Grand Finals."*

---

**Document Version:** 1.0  
**Created:** January 2025  
**Purpose:** ISTQB Testing Cup Competition System Instructions  
**Team:** Automation Aid (Slav Astinov, Sava Barbarov)  
**Target Event:** Grand Finals, Copenhagen, October 20th, 2025




