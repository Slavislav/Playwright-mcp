# SUT Overview Generation Prompt

## Purpose
This prompt enables automated generation of comprehensive System Under Test (SUT) Overview documents for any web application using Playwright MCP browser automation and analysis.

## When to Use This Prompt
Use this prompt when you need to:
- Analyze a new web application for testing purposes
- Generate comprehensive SUT documentation
- Prepare data for Test Plan, Test Analysis, and Test Design creation
- Understand system architecture, modules, and functionality

## Required Inputs
To use this prompt, provide:
1. **Target URL** - The web application URL to analyze
2. **Login Credentials** (if required):
   - Username
   - Password
3. **Additional Access Information** (if needed):
   - Any special login requirements
   - Multi-factor authentication details
   - Specific user roles to test

## Process Overview
The SUT Overview generation follows this systematic approach:

### Phase 1: Initial System Analysis
- Navigate to the target URL
- Capture initial page state and structure
- Document login page elements and authentication flow
- Perform login with provided credentials
- Analyze post-login dashboard and navigation structure

### Phase 2: Module Discovery & Exploration
- Systematically explore all accessible modules/sections
- Document navigation structure and menu hierarchy
- Identify user roles and permission levels
- Capture key functionality in each module
- Analyze data structures and user interface components

### Phase 3: Comprehensive Documentation
- Generate detailed SUT Overview document
- Structure information for Test Plan, Test Analysis, and Test Design preparation
- Include technical architecture, business processes, and security features
- Provide risk assessment and testing recommendations

## Detailed Process Instructions

### Step 1: System Navigation & Authentication
```
1. Use Playwright MCP to navigate to the provided URL
2. Take initial page snapshot to capture login interface
3. Document authentication elements (username/password fields, buttons)
4. Perform login using provided credentials
5. Capture post-login state and verify successful authentication
6. Document user role and permissions visible in the interface
```

### Step 2: Module Exploration
```
1. Systematically click through all accessible navigation elements
2. For each module/section visited:
   - Document the URL and page title
   - Capture page snapshot
   - Identify key functionality and features
   - Note data structures (tables, forms, lists)
   - Document user interface elements
   - Identify any sub-modules or nested functionality
3. Explore at least 3-5 major modules to ensure comprehensive coverage
4. Pay special attention to:
   - User management features
   - Data entry/editing capabilities
   - Search and filtering functions
   - Reporting and analytics features
   - Administrative functions
```

### Step 3: Data Structure Analysis
```
1. Identify and document:
   - User roles and permission levels
   - Data entities and their relationships
   - Form fields and validation requirements
   - Table structures and data display formats
   - Search and filtering capabilities
2. Note any pre-populated test data available
3. Document system configuration options
4. Identify integration points with external systems
```

### Step 4: SUT Overview Document Generation
Create a comprehensive document with the following structure:

#### Document Sections (Required):
1. **Executive Summary** - High-level system overview and purpose
2. **System Architecture & Technology Stack** - Technical components and framework
3. **System Modules & Functionality** - Detailed analysis of all discovered modules
4. **User Roles & Access Control** - Authentication, authorization, and permissions
5. **Data Management & Storage** - Data structures, entities, and relationships
6. **User Interface & User Experience** - UI components, navigation, and responsive design
7. **Business Processes & Workflows** - Key processes and user journeys
8. **Integration Points & External Systems** - External dependencies and APIs
9. **Security Features** - Authentication, authorization, and data protection
10. **Performance Characteristics** - System performance indicators and scalability
11. **Test Environment Information** - Available test data, credentials, and scenarios
12. **Risk Assessment & Critical Areas** - High/medium/low risk areas for testing
13. **Compliance & Standards** - Regulatory and business compliance considerations
14. **Test Preparation Data** - Specific data for Test Plan, Analysis, and Design preparation
15. **Recommendations for Testing** - Testing priorities, approach, and environment setup

#### Document Requirements:
- **Comprehensive Coverage**: Document all accessible functionality
- **Technical Detail**: Include specific UI elements, data structures, and workflows
- **Test-Ready Data**: Structure information for immediate use in test planning
- **Risk-Based Approach**: Prioritize areas based on business criticality
- **Actionable Insights**: Provide specific recommendations for testing strategy

### Step 5: Quality Assurance
```
1. Verify all major system modules have been explored
2. Ensure authentication and user role analysis is complete
3. Confirm data structures and business processes are documented
4. Validate that test preparation data is comprehensive
5. Check that risk assessment covers all critical areas
```

## Output Specifications

### File Naming Convention
Save the SUT Overview document as: `[ApplicationName]-SUT-Overview.md`

### Document Format
- Use Markdown format for easy reading and version control
- Include clear section headers and subsections
- Use tables for structured data presentation
- Include code blocks for technical specifications
- Add bullet points and numbered lists for clarity

### Content Quality Standards
- **Accuracy**: All information must be based on actual system exploration
- **Completeness**: Cover all accessible functionality and modules
- **Clarity**: Write in clear, professional language
- **Actionability**: Provide specific, implementable recommendations
- **Testability**: Structure information for immediate test planning use

## Knowledge Base Integration
The SUT Overview should prepare data that aligns with:
- **Test Plan Knowledge Base**: Scope, objectives, approach, and deliverables
- **Test Analysis Knowledge Base**: Requirements analysis, test scenarios, and coverage
- **Test Design Knowledge Base**: Test techniques, test cases, and automation opportunities

## Success Criteria
A successful SUT Overview document should enable:
1. **Immediate Test Planning**: All information needed for comprehensive test plan creation
2. **Test Analysis**: Complete requirements understanding and scenario identification
3. **Test Design**: Ready-to-implement test case design using appropriate techniques
4. **Risk-Based Testing**: Clear prioritization of testing efforts
5. **Automation Planning**: Identification of automation opportunities and requirements

## Example Usage
```
User Input:
- URL: https://example-app.com
- Username: admin
- Password: admin123

Expected Output:
- Comprehensive SUT Overview document
- Detailed module analysis
- Test preparation data
- Risk assessment
- Testing recommendations
```

## Notes
- Always use Playwright MCP for browser automation and page analysis
- Take multiple snapshots throughout the exploration process
- Document any errors or limitations encountered during analysis
- Focus on functionality that would be relevant for testing purposes
- Consider both positive and negative testing scenarios in the analysis

---

**Prompt Version**: 1.0  
**Created**: January 2025  
**Purpose**: Automated SUT Overview generation for web applications  
**Dependencies**: Playwright MCP, Test Planning Knowledge Bases




