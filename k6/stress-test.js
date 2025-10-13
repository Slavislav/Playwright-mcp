/**
 * K6 Stress Test
 *
 * Description: Gradually increases load to find the system's breaking point.
 * Helps identify maximum capacity and failure modes.
 *
 * Complexity: Intermediate
 * Pattern: Gradual ramp-up until system fails or reaches target
 *
 * Usage:
 * 1. Update BASE_URL with your target
 * 2. Adjust stages to customize ramp-up pattern
 * 3. Run: k6 run stress-test.js
 * 4. Watch for when thresholds fail or errors spike
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Trend, Rate } from 'k6/metrics';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/latest/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

// ========================================
// CONFIGURATION - MODIFY THIS SECTION
// ========================================

const BASE_URL = __ENV.BASE_URL || 'https://test-api.k6.io';

// Target endpoints
const ENDPOINTS = {
  main: '/public/crocodiles/',
  detail: '/public/crocodiles/1/',
};

// ========================================
// CUSTOM METRICS
// ========================================

const errorCounter = new Counter('custom_errors');
const slowRequests = new Counter('slow_requests');
const responseTimesTrend = new Trend('custom_response_times');
const errorRate = new Rate('custom_error_rate');

// ========================================
// TEST OPTIONS
// ========================================

export const options = {
  // Stress test pattern: Gradual ramp-up to breaking point
  stages: [
    // Normal load
    { duration: '30s', target: 10 },

    // Start increasing load
    { duration: '1m', target: 50 },

    // Continue increasing
    { duration: '1m', target: 100 },

    // Push harder
    { duration: '1m', target: 150 },

    // Maximum stress
    { duration: '1m', target: 200 },

    // Hold maximum to observe failure
    { duration: '2m', target: 200 },

    // Ramp down to see recovery
    { duration: '30s', target: 0 },
  ],

  // Relaxed thresholds - we EXPECT failures in stress test
  thresholds: {
    // Response time will likely degrade
    'http_req_duration': ['p(95)<5000'],

    // We expect some errors, but not catastrophic failure
    'http_req_failed': ['rate<0.20'], // Allow up to 20% errors

    // Track when we hit breaking point
    'custom_error_rate': ['rate<0.30'],

    // Custom metrics for analysis
    'custom_slow_requests': ['count<1000'],
  },

  // HTTP configuration
  timeout: '90s', // Longer timeout for stressed systems
  insecureSkipTLSVerify: true,
};

// ========================================
// TEST EXECUTION
// ========================================

/**
 * Main test function
 */
export default function () {
  const currentVU = __VU;
  const stressLevel = getStressLevel(currentVU);

  // Tag requests by stress level for analysis
  const params = {
    tags: { stress_level: stressLevel },
  };

  // Test main endpoint
  const mainResponse = http.get(`${BASE_URL}${ENDPOINTS.main}`, params);

  // Record custom metrics
  recordMetrics(mainResponse);

  // Check response
  const mainCheck = check(mainResponse, {
    'main: status is success': (r) => r.status >= 200 && r.status < 300,
    'main: not server error': (r) => r.status < 500,
    'main: has body': (r) => r.body && r.body.length > 0,
  });

  if (!mainCheck) {
    errorCounter.add(1);
  }

  // Reduced think time under stress
  sleep(0.5 + Math.random() * 0.5);

  // Test detail endpoint
  const detailResponse = http.get(`${BASE_URL}${ENDPOINTS.detail}`, params);

  // Record custom metrics
  recordMetrics(detailResponse);

  // Check response
  const detailCheck = check(detailResponse, {
    'detail: status is success': (r) => r.status >= 200 && r.status < 300,
    'detail: not server error': (r) => r.status < 500,
    'detail: response time < 10s': (r) => r.timings.duration < 10000,
  });

  if (!detailCheck) {
    errorCounter.add(1);
  }

  // Minimal pause between iterations under stress
  sleep(0.3);
}

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Determine stress level based on VU count
 * @param {number} vu Current VU number
 * @returns {string} Stress level
 */
function getStressLevel(vu) {
  if (vu <= 10) return 'low';
  if (vu <= 50) return 'medium';
  if (vu <= 100) return 'high';
  if (vu <= 150) return 'very_high';
  return 'extreme';
}

/**
 * Record custom metrics for analysis
 * @param {object} response HTTP response object
 */
function recordMetrics(response) {
  // Track response times
  responseTimesTrend.add(response.timings.duration);

  // Count slow requests (> 2s)
  if (response.timings.duration > 2000) {
    slowRequests.add(1);
  }

  // Track error rate
  errorRate.add(response.status >= 400);
}

// ========================================
// LIFECYCLE HOOKS
// ========================================

export function setup() {
  console.log('\n' + '='.repeat(70));
  console.log(' '.repeat(20) + 'STRESS TEST STARTING');
  console.log('='.repeat(70));
  console.log('Objective: Find the breaking point of the system');
  console.log('Target:', BASE_URL);
  console.log('Load Pattern: 10 → 50 → 100 → 150 → 200 VUs');
  console.log('Duration: ~7.5 minutes');
  console.log('='.repeat(70));
  console.log('Expected: Response times will degrade, errors may occur');
  console.log('Watch for: When error rate spikes or response time becomes unacceptable');
  console.log('='.repeat(70) + '\n');

  // Verify target accessibility
  const response = http.get(BASE_URL);
  if (response.status !== 200 && response.status !== 404) {
    console.warn(`⚠️  Warning: Target may not be accessible. Status: ${response.status}`);
  }

  return {
    startTime: new Date().toISOString(),
    testType: 'stress',
  };
}

export function teardown(data) {
  console.log('\n' + '='.repeat(70));
  console.log(' '.repeat(20) + 'STRESS TEST COMPLETED');
  console.log('='.repeat(70));
  console.log(`Started at: ${data.startTime}`);
  console.log('Review summary.html to identify the breaking point');
  console.log('Look for: When response times spike or error rate increases dramatically');
  console.log('='.repeat(70) + '\n');
}

// ========================================
// REPORTING
// ========================================

export function handleSummary(data) {
  // Analyze results to identify breaking point
  const metrics = data.metrics;

  const totalRequests = metrics.http_reqs?.values.count || 0;
  const errorRate = metrics.http_req_failed?.values.rate || 0;
  const p95Duration = metrics.http_req_duration?.values['p(95)'] || 0;
  const p99Duration = metrics.http_req_duration?.values['p(99)'] || 0;
  const maxDuration = metrics.http_req_duration?.values.max || 0;

  console.log('\n' + '='.repeat(70));
  console.log(' '.repeat(25) + 'STRESS TEST ANALYSIS');
  console.log('='.repeat(70));
  console.log(`Total Requests: ${totalRequests.toLocaleString()}`);
  console.log(`Error Rate: ${(errorRate * 100).toFixed(2)}%`);
  console.log(`Response Time (p95): ${p95Duration.toFixed(2)}ms`);
  console.log(`Response Time (p99): ${p99Duration.toFixed(2)}ms`);
  console.log(`Max Response Time: ${maxDuration.toFixed(2)}ms`);
  console.log('='.repeat(70));

  // Determine breaking point
  if (errorRate > 0.15) {
    console.log('⚠️  BREAKING POINT REACHED: High error rate detected');
  } else if (p95Duration > 3000) {
    console.log('⚠️  PERFORMANCE DEGRADATION: Response times significantly degraded');
  } else {
    console.log('✓ System handled stress well - consider increasing load further');
  }
  console.log('='.repeat(70) + '\n');

  return {
    'summary.html': htmlReport(data, {
      title: 'Stress Test Report - Breaking Point Analysis',
      theme: 'default',
    }),
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
  };
}

// ========================================
// CUSTOMIZATION EXAMPLES
// ========================================

/*
// Example 1: More aggressive stress test
export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 100 },
    { duration: '1m', target: 200 },
    { duration: '1m', target: 300 },
    { duration: '1m', target: 500 },   // Push to 500 VUs
    { duration: '2m', target: 500 },
    { duration: '30s', target: 0 },
  ],
};

// Example 2: Quick stress test (for time-limited scenarios)
export const options = {
  stages: [
    { duration: '10s', target: 25 },
    { duration: '20s', target: 50 },
    { duration: '20s', target: 100 },
    { duration: '20s', target: 150 },
    { duration: '10s', target: 0 },
  ],
};

// Example 3: Database-heavy stress test
export default function () {
  // Simulate write-heavy operations under stress
  const payload = JSON.stringify({
    data: 'test'.repeat(100), // Larger payload
    timestamp: Date.now(),
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  // Write operation
  const writeResponse = http.post(`${BASE_URL}/api/data`, payload, params);
  check(writeResponse, {
    'write successful': (r) => r.status === 201,
  });

  sleep(0.1);

  // Read operation
  http.get(`${BASE_URL}/api/data`);

  sleep(0.2);
}

// Example 4: Memory leak detection
export default function () {
  // Request endpoint that might have memory leak
  const response = http.get(`${BASE_URL}/api/heavy-operation`);

  // Monitor response times - they'll increase if memory leak exists
  check(response, {
    'no significant degradation': (r) => r.timings.duration < 5000,
  });

  sleep(0.5);
}

// Example 5: Connection pool exhaustion test
export const options = {
  stages: [
    { duration: '10s', target: 100 },
    { duration: '30s', target: 500 },  // Rapid jump to exhaust connections
    { duration: '1m', target: 500 },
    { duration: '10s', target: 0 },
  ],
  // Use more concurrent connections
  batch: 20,
  batchPerHost: 10,
};
*/
