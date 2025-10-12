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

## Notes
- Always prioritize competition scoring criteria (20 points)
- Build upon both Test Plan and Test Analysis foundations consistently
- Apply appropriate test design techniques for comprehensive coverage
- Ensure test cases are executable and realistic
- Maintain complete traceability throughout the document chain
- Focus on high-risk features identified in previous documents
- Use Playwright MCP strategically for detailed functionality analysis

---

**Prompt Version**: 1.0  
**Created**: January 2025  
**Purpose**: ISTQB Testing Cup Test Design Generation  
**Dependencies**: Test Plan Document, Test Analysis Document, SUT Overview, PROJECT-SYSTEM-MESSAGE.md, test-design-knowledge-base.md, Playwright MCP


