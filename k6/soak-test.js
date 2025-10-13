/**
 * K6 Soak Test (Endurance Test)
 *
 * Description: Long-running test to identify memory leaks, resource exhaustion,
 * and performance degradation over time.
 *
 * Complexity: Intermediate
 * Pattern: Moderate load over extended period (hours)
 *
 * Usage:
 * 1. Update BASE_URL with your target
 * 2. Adjust duration (default is 10 minutes for demo, typically run for hours)
 * 3. Run: k6 run soak-test.js
 * 4. Monitor for gradual performance degradation
 *
 * NOTE: This test is configured for 10 minutes by default.
 * In production, run for 1-4 hours or longer.
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Trend, Gauge } from 'k6/metrics';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/latest/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

// ========================================
// CONFIGURATION - MODIFY THIS SECTION
// ========================================

const BASE_URL = __ENV.BASE_URL || 'https://test-api.k6.io';

// Test duration - adjust for actual soak test
const RAMP_UP_TIME = __ENV.RAMP_UP || '2m';
const SOAK_TIME = __ENV.SOAK_TIME || '10m';  // Increase to '2h' or '4h' for real tests
const RAMP_DOWN_TIME = __ENV.RAMP_DOWN || '2m';

// Target endpoints
const ENDPOINTS = {
  main: '/public/crocodiles/',
  detail: (id) => `/public/crocodiles/${id}/`,
};

// ========================================
// CUSTOM METRICS FOR SOAK TEST
// ========================================

const degradationTrend = new Trend('performance_degradation');
const memoryIndicator = new Gauge('memory_leak_indicator');
const consecutiveErrors = new Counter('consecutive_errors');

// Track baseline for comparison
let baselineResponseTime = null;
let errorStreak = 0;

// ========================================
// TEST OPTIONS
// ========================================

export const options = {
  // Soak test pattern: Ramp up, maintain load, ramp down
  stages: [
    // Ramp up to target load
    { duration: RAMP_UP_TIME, target: 50 },

    // Maintain constant moderate load for extended period
    { duration: SOAK_TIME, target: 50 },

    // Ramp down
    { duration: RAMP_DOWN_TIME, target: 0 },
  ],

  // Thresholds - monitor for degradation
  thresholds: {
    // Response times should stay relatively stable
    'http_req_duration': ['p(95)<1000'],

    // Response time should not increase over time (memory leak indicator)
    'http_req_duration{type:baseline}': ['p(95)<800'],
    'http_req_duration{type:midpoint}': ['p(95)<1000'],
    'http_req_duration{type:endgame}': ['p(95)<1200'],

    // Error rate should remain low throughout
    'http_req_failed': ['rate<0.01'],

    // Check pass rate should stay high
    'checks': ['rate>0.95'],

    // Custom degradation metrics
    'performance_degradation': ['p(95)<500'], // Degradation should be < 500ms
  },

  // HTTP configuration
  timeout: '60s',
  insecureSkipTLSVerify: true,
};

// ========================================
// TEST EXECUTION
// ========================================

/**
 * Main test function
 * Monitors for performance degradation over time
 */
export default function () {
  const testPhase = getTestPhase();

  const params = {
    tags: { phase: testPhase, type: testPhase },
  };

  // Request main endpoint
  const mainResponse = http.get(`${BASE_URL}${ENDPOINTS.main}`, params);

  // Track performance degradation
  trackPerformanceDegradation(mainResponse);

  // Standard checks
  const mainCheck = check(mainResponse, {
    'main: status is 200': (r) => r.status === 200,
    'main: has body': (r) => r.body && r.body.length > 0,
    'main: response time acceptable': (r) => r.timings.duration < 2000,
    'main: no timeout': (r) => r.status !== 0,
  });

  // Track error streaks (indicator of degradation)
  if (!mainCheck) {
    errorStreak++;
    consecutiveErrors.add(1);
  } else {
    errorStreak = 0;
  }

  // Warn if error streak detected
  if (errorStreak >= 5) {
    console.warn(`⚠️  Error streak detected: ${errorStreak} consecutive failures`);
  }

  // Think time
  sleep(1 + Math.random());

  // Request detail endpoint
  const detailId = Math.floor(Math.random() * 10) + 1;
  const detailResponse = http.get(`${BASE_URL}${ENDPOINTS.detail(detailId)}`, params);

  // Track performance
  trackPerformanceDegradation(detailResponse);

  check(detailResponse, {
    'detail: status is 200': (r) => r.status === 200,
    'detail: response time acceptable': (r) => r.timings.duration < 2000,
  });

  // Think time
  sleep(1 + Math.random());
}

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Determine which phase of the test we're in
 * @returns {string} Test phase
 */
function getTestPhase() {
  const now = new Date();
  const testStart = now.getTime();

  // This is simplified - in real test you'd track actual start time
  const elapsed = __ITER * 3; // Approximate seconds elapsed

  const rampUpSeconds = parseTime(RAMP_UP_TIME);
  const soakSeconds = parseTime(SOAK_TIME);

  if (elapsed < rampUpSeconds) {
    return 'ramp_up';
  } else if (elapsed < rampUpSeconds + soakSeconds / 3) {
    return 'baseline';
  } else if (elapsed < rampUpSeconds + (soakSeconds * 2) / 3) {
    return 'midpoint';
  } else if (elapsed < rampUpSeconds + soakSeconds) {
    return 'endgame';
  } else {
    return 'ramp_down';
  }
}

/**
 * Parse time string to seconds (simplified)
 * @param {string} timeStr Time string like '2m' or '10m'
 * @returns {number} Seconds
 */
function parseTime(timeStr) {
  const match = timeStr.match(/(\d+)([smh])/);
  if (!match) return 0;

  const value = parseInt(match[1]);
  const unit = match[2];

  switch (unit) {
    case 's': return value;
    case 'm': return value * 60;
    case 'h': return value * 3600;
    default: return 0;
  }
}

/**
 * Track performance degradation over time
 * @param {object} response HTTP response
 */
function trackPerformanceDegradation(response) {
  const currentResponseTime = response.timings.duration;

  // Set baseline on first successful request
  if (!baselineResponseTime && response.status === 200) {
    baselineResponseTime = currentResponseTime;
  }

  // Calculate degradation from baseline
  if (baselineResponseTime) {
    const degradation = currentResponseTime - baselineResponseTime;
    degradationTrend.add(degradation);

    // Memory leak indicator (response times steadily increasing)
    if (degradation > 1000) {
      memoryIndicator.add(1);
    } else {
      memoryIndicator.add(0);
    }
  }
}

// ========================================
// LIFECYCLE HOOKS
// ========================================

export function setup() {
  console.log('\n' + '='.repeat(70));
  console.log(' '.repeat(25) + 'SOAK TEST STARTING');
  console.log('='.repeat(70));
  console.log('Objective: Identify memory leaks and performance degradation over time');
  console.log('Target:', BASE_URL);
  console.log('\nTest Configuration:');
  console.log(`  Ramp Up:   ${RAMP_UP_TIME}`);
  console.log(`  Soak Time: ${SOAK_TIME} ← Increase to 2h-4h for production tests`);
  console.log(`  Ramp Down: ${RAMP_DOWN_TIME}`);
  console.log('  Load:      50 VUs (constant)');
  console.log('='.repeat(70));
  console.log('What to watch for:');
  console.log('  • Gradually increasing response times');
  console.log('  • Error rate creeping up over time');
  console.log('  • Memory usage growing (monitor server separately)');
  console.log('  • Resource exhaustion (connections, file handles, etc.)');
  console.log('='.repeat(70) + '\n');

  // Verify target accessibility
  const response = http.get(BASE_URL);
  if (response.status !== 200 && response.status !== 404) {
    console.warn(`⚠️  Warning: Target may not be accessible. Status: ${response.status}`);
  } else {
    console.log('✓ Target is accessible');
    console.log('✓ Starting soak test...\n');
  }

  return {
    startTime: new Date().toISOString(),
    testType: 'soak',
  };
}

export function teardown(data) {
  console.log('\n' + '='.repeat(70));
  console.log(' '.repeat(25) + 'SOAK TEST COMPLETED');
  console.log('='.repeat(70));
  console.log(`Started at: ${data.startTime}`);
  console.log(`Completed at: ${new Date().toISOString()}`);
  console.log('\nReview summary.html for:');
  console.log('  • Response time trends over duration');
  console.log('  • Error rate stability');
  console.log('  • Performance degradation indicators');
  console.log('='.repeat(70) + '\n');
}

// ========================================
// REPORTING
// ========================================

export function handleSummary(data) {
  const metrics = data.metrics;

  const totalRequests = metrics.http_reqs?.values.count || 0;
  const errorRate = metrics.http_req_failed?.values.rate || 0;
  const avgDuration = metrics.http_req_duration?.values.avg || 0;
  const p95Duration = metrics.http_req_duration?.values['p(95)'] || 0;
  const minDuration = metrics.http_req_duration?.values.min || 0;
  const maxDuration = metrics.http_req_duration?.values.max || 0;

  // Calculate degradation
  const degradation = maxDuration - minDuration;
  const degradationPercent = minDuration > 0 ? ((degradation / minDuration) * 100) : 0;

  console.log('\n' + '='.repeat(70));
  console.log(' '.repeat(22) + 'SOAK TEST ANALYSIS');
  console.log('='.repeat(70));
  console.log(`Total Requests: ${totalRequests.toLocaleString()}`);
  console.log(`Error Rate: ${(errorRate * 100).toFixed(2)}%`);
  console.log('\nResponse Time Analysis:');
  console.log(`  Minimum:  ${minDuration.toFixed(2)}ms`);
  console.log(`  Average:  ${avgDuration.toFixed(2)}ms`);
  console.log(`  P95:      ${p95Duration.toFixed(2)}ms`);
  console.log(`  Maximum:  ${maxDuration.toFixed(2)}ms`);
  console.log(`  Range:    ${degradation.toFixed(2)}ms (${degradationPercent.toFixed(1)}% increase)`);
  console.log('='.repeat(70));

  // Analyze results
  if (degradationPercent > 50) {
    console.log('⚠️  SIGNIFICANT DEGRADATION DETECTED');
    console.log('    Response times increased by >50% over test duration');
    console.log('    Possible memory leak or resource exhaustion');
  } else if (degradationPercent > 25) {
    console.log('⚠️  MODERATE DEGRADATION DETECTED');
    console.log('    Response times increased by >25% over test duration');
    console.log('    Monitor for resource issues');
  } else if (errorRate > 0.05) {
    console.log('⚠️  ELEVATED ERROR RATE');
    console.log('    Error rate above 5% - investigate stability issues');
  } else {
    console.log('✓ SYSTEM STABLE');
    console.log('  Response times remained relatively consistent');
    console.log('  No significant degradation detected');
  }

  console.log('='.repeat(70) + '\n');

  return {
    'summary.html': htmlReport(data, {
      title: 'Soak Test Report - Long-term Stability Analysis',
      theme: 'default',
    }),
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
  };
}

// ========================================
// CUSTOMIZATION EXAMPLES
// ========================================

/*
// Example 1: Extended production soak test (4 hours)
export const options = {
  stages: [
    { duration: '5m', target: 50 },    // Ramp up
    { duration: '4h', target: 50 },    // Soak for 4 hours
    { duration: '5m', target: 0 },     // Ramp down
  ],
};

// Example 2: Weekend soak test (48 hours)
export const options = {
  stages: [
    { duration: '10m', target: 30 },   // Ramp up
    { duration: '48h', target: 30 },   // Soak for weekend
    { duration: '10m', target: 0 },    // Ramp down
  ],
};

// Example 3: Variable load soak test
export const options = {
  stages: [
    { duration: '5m', target: 30 },
    { duration: '30m', target: 30 },
    { duration: '5m', target: 50 },    // Increase load mid-test
    { duration: '30m', target: 50 },
    { duration: '5m', target: 30 },    // Decrease back
    { duration: '30m', target: 30 },
    { duration: '5m', target: 0 },
  ],
};

// Example 4: Memory leak detection focus
export default function () {
  // Request endpoint that allocates memory
  const response = http.get(`${BASE_URL}/api/memory-intensive`);

  // Track response time progression
  const responseTime = response.timings.duration;

  // Log every 100th request to monitor trend
  if (__ITER % 100 === 0) {
    console.log(`Iteration ${__ITER}: Response time ${responseTime.toFixed(2)}ms`);
  }

  check(response, {
    'no significant degradation': (r) => r.timings.duration < baselineResponseTime * 2,
  });

  sleep(2);
}

// Example 5: Database connection leak detection
export default function () {
  // Operations that open database connections
  http.get(`${BASE_URL}/api/db-query`);
  sleep(1);

  http.post(`${BASE_URL}/api/db-write`, JSON.stringify({
    data: 'test',
  }), {
    headers: { 'Content-Type': 'application/json' },
  });

  sleep(1);

  // Monitor for connection pool exhaustion
  // (Response times will spike when pool is exhausted)
}

// Example 6: Gradual memory leak simulation
let allocatedData = [];
export default function () {
  // Simulate memory accumulation
  http.get(`${BASE_URL}/api/data`);

  // Track if response times increase as test progresses
  const phase = Math.floor(__ITER / 100);

  check(response, {
    [`phase ${phase}: response time acceptable`]: (r) => r.timings.duration < 1000,
  });

  sleep(1);
}
*/
