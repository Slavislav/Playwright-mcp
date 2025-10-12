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

## Process Overview
The Test Analysis generation follows this systematic approach:

### Phase 1: Foundation Analysis
- Analyze Test Plan document for scope, risks, and priorities
- Reference PROJECT-SYSTEM-MESSAGE.md for Test Analysis scoring criteria
- Review Test Analysis Knowledge Base for document structure requirements
- Identify high-risk features requiring detailed analysis

### Phase 2: Targeted Data Gathering
- Use Playwright MCP to gather specific Test Analysis data from SUT
- Focus on high-risk features and critical functionality
- Capture detailed test conditions and scenarios
- Document traceability and prioritization requirements

### Phase 3: Test Analysis Document Generation
- Create comprehensive Test Analysis following knowledge base structure
- Optimize content for ISTQB competition scoring (20 points)
- Generate professional HTML output using template design
- Ensure focus on high-risk features with well-defined test conditions

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

### Step 2: Targeted Playwright MCP Exploration
```
1. Navigate to SUT using provided URL and credentials
2. Focus on gathering Test Analysis specific data:
   - High-risk features: Critical business functions, failure points
   - Test conditions: Detailed scenarios for each risk area
   - Traceability: Link test conditions to requirements and risks
   - Prioritization: Risk-based prioritization of test scenarios
   - Coverage analysis: Comprehensive scenario coverage
3. Capture detailed functionality analysis and user workflows
4. Document test data requirements and validation criteria
5. Identify boundary conditions and edge cases
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

## Notes
- Always prioritize competition scoring criteria (20 points)
- Build upon Test Plan foundation consistently
- Focus on high-risk features identified in Test Plan
- Ensure test conditions are actionable and executable
- Maintain complete traceability throughout
- Use Playwright MCP strategically for detailed feature analysis

---

**Prompt Version**: 1.0  
**Created**: January 2025  
**Purpose**: ISTQB Testing Cup Test Analysis Generation  
**Dependencies**: Test Plan Document, SUT Overview, PROJECT-SYSTEM-MESSAGE.md, test-analysis-knowledge-base.md, Playwright MCP




