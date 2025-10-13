# K6 Load Testing Toolkit

Quick reference guide for load testing competitions. For comprehensive documentation, see [AI_AGENT_PROMPT.md](./AI_AGENT_PROMPT.md).

## Quick Start

### 1. Choose Your Template

| Template | Use Case | Complexity |
|----------|----------|------------|
| `basic-load-test.js` | Simple endpoint testing | Beginner |
| `spike-test.js` | Sudden traffic surge | Beginner-Intermediate |
| `stress-test.js` | Find breaking points | Intermediate |
| `api-rest-test.js` | Multi-endpoint APIs | Intermediate |
| `scenario-based-test.js` | Realistic user behavior | Intermediate |
| `soak-test.js` | Long-term stability | Intermediate |

### 2. Customize the URLs

Open your chosen template and modify the configuration section:

```javascript
// ========================================
// CONFIGURATION - MODIFY THIS SECTION
// ========================================
const BASE_URL = 'https://your-target-here.com';  // ← CHANGE THIS
```

### 3. Adjust Load Parameters

```javascript
export const options = {
  vus: 10,           // Number of concurrent users
  duration: '30s',   // How long to run
};
```

### 4. Run the Test

```bash
k6 run basic-load-test.js
```

### 5. View Results

Open `summary.html` in your browser to see the detailed report.

## Common Commands

```bash
# Run with custom parameters
k6 run --vus 50 --duration 2m script.js

# Run with environment variable
k6 run -e BASE_URL=https://example.com script.js

# Quiet mode (less output)
k6 run --quiet script.js
```

## Playwright Integration Workflow

1. Use Playwright MCP to explore the target website
2. Capture network requests and identify endpoints
3. Update the K6 script with discovered URLs
4. Run the load test

Example:
```javascript
// After discovering endpoints with Playwright:
const ENDPOINTS = {
  home: '/',
  api: '/api/data',
  login: '/auth/login',
};
```

## Key Metrics

- **http_req_duration**: Response time (target: p95 < 500ms)
- **http_req_failed**: Error rate (target: < 1%)
- **http_reqs**: Requests per second (throughput)
- **checks**: Validation pass rate (target: > 95%)

## Thresholds Cheat Sheet

```javascript
thresholds: {
  'http_req_duration': ['p(95)<500'],      // 95% under 500ms
  'http_req_failed': ['rate<0.01'],        // Less than 1% errors
  'checks': ['rate>0.95'],                  // 95% checks pass
}
```

## Competition Strategy (25 minutes)

| Time | Task | Action |
|------|------|--------|
| 5 min | Reconnaissance | Use Playwright to explore the app |
| 2 min | Template Selection | Choose the right scaffold |
| 5 min | Customization | Update URLs and parameters |
| 3 min | Validation | Test with 1 VU first |
| 5 min | Execution | Run the full load test |
| 5 min | Analysis | Review the HTML report |

## Helper Files

- **utils.js**: Reusable functions for data generation and checks
- **config.js**: Centralized configuration template
- **AI_AGENT_PROMPT.md**: Complete reference for AI agents

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Connection refused | Check URL is accessible |
| High error rate | Reduce VUs or slow down ramp-up |
| Timeouts | Increase timeout in options |
| SSL errors | Set `insecureSkipTLSVerify: true` |

## Tips for Success

1. Start with 1 VU to verify endpoints work
2. Gradually increase load (10 → 50 → 100 VUs)
3. Use realistic think time with `sleep()`
4. Set appropriate thresholds for pass/fail
5. Always generate HTML reports
6. Document your findings

## File Structure

```
k6/
├── README.md                   # This file
├── AI_AGENT_PROMPT.md         # Comprehensive guide
├── config.js                   # Configuration template
├── utils.js                    # Helper functions
├── basic-load-test.js         # Simple constant load
├── spike-test.js              # Sudden traffic surge
├── stress-test.js             # Gradual ramp-up
├── api-rest-test.js           # Multi-endpoint API testing
├── scenario-based-test.js     # Multiple user scenarios
└── soak-test.js               # Long-running test
```

## Additional Resources

- [K6 Documentation](https://k6.io/docs/)
- [K6 Examples](https://k6.io/docs/examples/)
- [K6 Reporter](https://github.com/benc-uk/k6-reporter)

---

**Quick Competition Tip**: Don't over-engineer. Pick a template, change the URL, run it, get the report. Speed matters!
