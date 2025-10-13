/**
 * K6 Basic Load Test
 *
 * Description: Simple constant load test with configurable VUs and duration.
 * Use this for basic endpoint capacity testing.
 *
 * Complexity: Beginner
 * Pattern: Constant load over time
 *
 * Usage:
 * 1. Update BASE_URL with your target
 * 2. Adjust VUs and duration in options
 * 3. Run: k6 run basic-load-test.js
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/latest/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

// ========================================
// CONFIGURATION - MODIFY THIS SECTION
// ========================================

const BASE_URL = __ENV.BASE_URL || 'https://test-api.k6.io';

// Target endpoints to test (relative to BASE_URL)
const ENDPOINTS = {
  main: '/public/crocodiles/',
  detail: '/public/crocodiles/1/',
};

// ========================================
// TEST OPTIONS
// ========================================

export const options = {
  // Number of virtual users (concurrent users)
  vus: 10,

  // Test duration
  duration: '30s',

  // Thresholds - Define pass/fail criteria
  thresholds: {
    // 95% of requests should complete within 500ms
    'http_req_duration': ['p(95)<500'],

    // 99% of requests should complete within 1s
    'http_req_duration{expected_response:true}': ['p(99)<1000'],

    // Error rate should be less than 1%
    'http_req_failed': ['rate<0.01'],

    // 95% of checks should pass
    'checks': ['rate>0.95'],
  },

  // HTTP configuration
  timeout: '60s',
  insecureSkipTLSVerify: true,
};

// ========================================
// TEST EXECUTION
// ========================================

/**
 * Main test function - executed by each VU repeatedly
 */
export default function () {
  // Test the main endpoint
  const mainResponse = http.get(`${BASE_URL}${ENDPOINTS.main}`);

  // Validate the response
  check(mainResponse, {
    'main endpoint: status is 200': (r) => r.status === 200,
    'main endpoint: response has body': (r) => r.body && r.body.length > 0,
    'main endpoint: response time < 500ms': (r) => r.timings.duration < 500,
  });

  // Simulate user think time (1-2 seconds)
  sleep(1 + Math.random());

  // Test the detail endpoint
  const detailResponse = http.get(`${BASE_URL}${ENDPOINTS.detail}`);

  // Validate the detail response
  check(detailResponse, {
    'detail endpoint: status is 200': (r) => r.status === 200,
    'detail endpoint: response has body': (r) => r.body && r.body.length > 0,
    'detail endpoint: response time < 500ms': (r) => r.timings.duration < 500,
  });

  // Simulate user think time (1-2 seconds)
  sleep(1 + Math.random());
}

// ========================================
// SETUP AND TEARDOWN (Optional)
// ========================================

/**
 * Setup function - runs once before the test starts
 * Use this to prepare test data or verify the target is accessible
 */
export function setup() {
  // Verify the target is accessible
  const response = http.get(BASE_URL);

  if (response.status !== 200 && response.status !== 404) {
    console.warn(`Warning: Target may not be accessible. Status: ${response.status}`);
  }

  console.log('Test setup complete. Starting load test...');
  return { startTime: new Date().toISOString() };
}

/**
 * Teardown function - runs once after the test completes
 * Use this for cleanup or final reporting
 */
export function teardown(data) {
  console.log(`Test completed. Started at: ${data.startTime}`);
}

// ========================================
// REPORTING
// ========================================

/**
 * Generate HTML report and console summary
 */
export function handleSummary(data) {
  return {
    'summary.html': htmlReport(data, {
      title: 'Basic Load Test Report',
      theme: 'default',
    }),
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
  };
}

// ========================================
// CUSTOMIZATION EXAMPLES
// ========================================

/*
// Example 1: Add authentication
const params = {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN_HERE',
    'Content-Type': 'application/json',
  },
};
const response = http.get(`${BASE_URL}/api/protected`, params);

// Example 2: Add custom headers
const params = {
  headers: {
    'X-API-Key': 'your-api-key',
    'User-Agent': 'K6-LoadTest/1.0',
  },
};

// Example 3: Add query parameters
const url = `${BASE_URL}/api/search?q=test&limit=10`;
const response = http.get(url);

// Example 4: Test multiple pages in sequence
export default function () {
  // Home page
  http.get(`${BASE_URL}/`);
  sleep(1);

  // About page
  http.get(`${BASE_URL}/about`);
  sleep(1);

  // Contact page
  http.get(`${BASE_URL}/contact`);
  sleep(1);
}

// Example 5: Adjust load dynamically with environment variables
export const options = {
  vus: __ENV.VUS || 10,
  duration: __ENV.DURATION || '30s',
};

// Run with: k6 run -e VUS=50 -e DURATION=2m basic-load-test.js
*/
