/**
 * K6 Spike Test
 *
 * Description: Tests system behavior under sudden traffic spikes.
 * Simulates scenarios like viral content, flash sales, or sudden traffic surge.
 *
 * Complexity: Beginner-Intermediate
 * Pattern: Rapid increase/decrease in load
 *
 * Usage:
 * 1. Update BASE_URL with your target
 * 2. Adjust stages to customize spike pattern
 * 3. Run: k6 run spike-test.js
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/latest/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

// ========================================
// CONFIGURATION - MODIFY THIS SECTION
// ========================================

const BASE_URL = __ENV.BASE_URL || 'https://test-api.k6.io';

// Target endpoints
const ENDPOINTS = {
  main: '/public/crocodiles/',
  popular: '/public/crocodiles/1/',
};

// ========================================
// TEST OPTIONS
// ========================================

export const options = {
  // Spike test pattern: ramp up quickly, hold, then drop
  stages: [
    // Warm-up: Gradually increase to normal load
    { duration: '10s', target: 10 },

    // SPIKE: Sudden surge in traffic
    { duration: '5s', target: 100 },

    // Hold the spike: Maintain high load
    { duration: '30s', target: 100 },

    // Drop: Quick decrease to low load
    { duration: '5s', target: 10 },

    // Recovery: Maintain low load to see system recovery
    { duration: '20s', target: 10 },

    // Cool down
    { duration: '10s', target: 0 },
  ],

  // Thresholds - More relaxed for spike tests
  thresholds: {
    // Allow higher response times during spike
    'http_req_duration': ['p(95)<2000'],

    // Allow higher error rate during spike (up to 5%)
    'http_req_failed': ['rate<0.05'],

    // At least 90% of checks should pass
    'checks': ['rate>0.90'],

    // Track spike impact separately
    'http_req_duration{scenario:spike}': ['p(95)<3000'],
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
 * Simulates users hitting popular content during a spike
 */
export default function () {
  // Tag requests to identify spike period
  const isSpike = __VU > 50; // VUs > 50 are considered spike traffic

  const params = {
    tags: { scenario: isSpike ? 'spike' : 'normal' },
  };

  // Request the main endpoint
  const mainResponse = http.get(`${BASE_URL}${ENDPOINTS.main}`, params);

  check(mainResponse, {
    'status is 200': (r) => r.status === 200,
    'has body': (r) => r.body && r.body.length > 0,
    'response time acceptable': (r) => r.timings.duration < 3000,
  });

  // Shorter think time during spike (users are more eager)
  sleep(0.5 + Math.random() * 0.5);

  // Request popular item (common during spikes)
  const popularResponse = http.get(`${BASE_URL}${ENDPOINTS.popular}`, params);

  check(popularResponse, {
    'popular: status is 200': (r) => r.status === 200,
    'popular: has body': (r) => r.body && r.body.length > 0,
    'popular: response time acceptable': (r) => r.timings.duration < 3000,
  });

  // Brief pause before next iteration
  sleep(0.5);
}

// ========================================
// LIFECYCLE HOOKS
// ========================================

export function setup() {
  console.log('='.repeat(60));
  console.log('SPIKE TEST STARTING');
  console.log('='.repeat(60));
  console.log('Pattern: 10 → 100 VUs (spike) → 10 → 0');
  console.log('Target:', BASE_URL);
  console.log('='.repeat(60));

  // Verify target is accessible
  const response = http.get(BASE_URL);
  if (response.status !== 200 && response.status !== 404) {
    console.warn(`⚠️  Warning: Target may not be accessible. Status: ${response.status}`);
  }

  return {
    startTime: new Date().toISOString(),
    testType: 'spike',
  };
}

export function teardown(data) {
  console.log('='.repeat(60));
  console.log('SPIKE TEST COMPLETED');
  console.log(`Started at: ${data.startTime}`);
  console.log('Check summary.html for detailed results');
  console.log('='.repeat(60));
}

// ========================================
// REPORTING
// ========================================

export function handleSummary(data) {
  // Calculate custom spike metrics
  const spikeDuration = data.metrics.http_req_duration;
  const errorRate = data.metrics.http_req_failed?.values.rate || 0;

  console.log('\n' + '='.repeat(60));
  console.log('SPIKE TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`Max Response Time (p99): ${spikeDuration?.values['p(99)']?.toFixed(2)}ms`);
  console.log(`Error Rate: ${(errorRate * 100).toFixed(2)}%`);
  console.log(`Total Requests: ${data.metrics.http_reqs?.values.count || 0}`);
  console.log('='.repeat(60) + '\n');

  return {
    'summary.html': htmlReport(data, {
      title: 'Spike Test Report - Sudden Traffic Surge',
      theme: 'default',
    }),
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
  };
}

// ========================================
// CUSTOMIZATION EXAMPLES
// ========================================

/*
// Example 1: More aggressive spike (10 → 500 VUs)
export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '5s', target: 500 },   // Massive spike
    { duration: '20s', target: 500 },
    { duration: '5s', target: 10 },
    { duration: '10s', target: 0 },
  ],
};

// Example 2: Multiple spikes
export const options = {
  stages: [
    { duration: '10s', target: 10 },
    // First spike
    { duration: '5s', target: 100 },
    { duration: '20s', target: 100 },
    { duration: '10s', target: 10 },
    // Second spike
    { duration: '5s', target: 100 },
    { duration: '20s', target: 100 },
    { duration: '10s', target: 0 },
  ],
};

// Example 3: Flash sale simulation
export default function () {
  // Simulate users trying to purchase during flash sale
  const productId = Math.floor(Math.random() * 10) + 1;

  // View product
  http.get(`${BASE_URL}/api/products/${productId}`);
  sleep(0.1); // Very short think time during flash sale

  // Add to cart (POST request)
  const payload = JSON.stringify({
    productId: productId,
    quantity: 1,
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  http.post(`${BASE_URL}/api/cart`, payload, params);
  sleep(0.1);
}

// Example 4: Viral content simulation
export default function () {
  // Simulate users sharing/viewing viral content
  const viralContentId = 'trending-123';

  // View viral content
  http.get(`${BASE_URL}/content/${viralContentId}`);

  // Simulate social shares (API calls)
  http.post(`${BASE_URL}/api/share`, JSON.stringify({
    contentId: viralContentId,
    platform: 'twitter',
  }), {
    headers: { 'Content-Type': 'application/json' },
  });

  sleep(0.5);
}

// Example 5: Customize spike based on time of day
export default function () {
  const currentVU = __VU;
  const peakTraffic = currentVU > 75; // Identify peak period

  if (peakTraffic) {
    // During peak, hit multiple endpoints rapidly
    http.get(`${BASE_URL}/hot`);
    sleep(0.2);
    http.get(`${BASE_URL}/trending`);
    sleep(0.2);
  } else {
    // Normal traffic pattern
    http.get(`${BASE_URL}/`);
    sleep(1);
  }
}
*/
