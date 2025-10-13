/**
 * K6 Scenario-Based Load Test
 *
 * Description: Simulates realistic user behavior with multiple scenarios and different load patterns.
 * Each scenario represents a different user journey with weighted distribution.
 *
 * Complexity: Intermediate
 * Pattern: Multiple concurrent scenarios with different executors and weights
 *
 * Usage:
 * 1. Update BASE_URL and endpoints
 * 2. Customize scenarios to match your user flows
 * 3. Adjust weights to reflect realistic traffic distribution
 * 4. Run: k6 run scenario-based-test.js
 */

import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { randomIntBetween, randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/latest/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

// ========================================
// CONFIGURATION - MODIFY THIS SECTION
// ========================================

const BASE_URL = __ENV.BASE_URL || 'https://test-api.k6.io';

// Define your application endpoints
const ENDPOINTS = {
  home: '/public/crocodiles/',
  browse: '/public/crocodiles/',
  detail: (id) => `/public/crocodiles/${id}/`,

  // Add your custom endpoints
  // search: '/api/search',
  // cart: '/api/cart',
  // checkout: '/api/checkout',
  // profile: '/api/user/profile',
};

// ========================================
// TEST OPTIONS WITH SCENARIOS
// ========================================

export const options = {
  // Define multiple scenarios with different behaviors
  scenarios: {
    // Scenario 1: Casual Browsers (70% of traffic)
    // Users who browse but don't take action
    casual_browser: {
      executor: 'ramping-vus',
      exec: 'casualBrowserScenario',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 20 },
        { duration: '2m', target: 20 },
        { duration: '30s', target: 0 },
      ],
      gracefulRampDown: '10s',
      tags: { scenario_type: 'casual_browser' },
    },

    // Scenario 2: Active Users (20% of traffic)
    // Users who interact more deeply with content
    active_user: {
      executor: 'ramping-vus',
      exec: 'activeUserScenario',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 7 },
        { duration: '2m', target: 7 },
        { duration: '30s', target: 0 },
      ],
      gracefulRampDown: '10s',
      tags: { scenario_type: 'active_user' },
    },

    // Scenario 3: Power Users (10% of traffic)
    // Heavy users performing complex operations
    power_user: {
      executor: 'ramping-vus',
      exec: 'powerUserScenario',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 3 },
        { duration: '2m', target: 3 },
        { duration: '30s', target: 0 },
      ],
      gracefulRampDown: '10s',
      tags: { scenario_type: 'power_user' },
    },
  },

  // Thresholds apply to all scenarios
  thresholds: {
    // Overall thresholds
    'http_req_duration': ['p(95)<1000'],
    'http_req_failed': ['rate<0.02'],
    'checks': ['rate>0.95'],

    // Per-scenario thresholds
    'http_req_duration{scenario_type:casual_browser}': ['p(95)<800'],
    'http_req_duration{scenario_type:active_user}': ['p(95)<1000'],
    'http_req_duration{scenario_type:power_user}': ['p(95)<1500'],

    // Group-specific thresholds
    'group_duration{group:::Browsing}': ['p(95)<2000'],
    'group_duration{group:::Detailed View}': ['p(95)<1500'],
    'group_duration{group:::Heavy Operations}': ['p(95)<3000'],
  },

  // HTTP configuration
  timeout: '60s',
  insecureSkipTLSVerify: true,
};

// ========================================
// SCENARIO 1: CASUAL BROWSER
// ========================================

/**
 * Casual browser - quick visits, minimal interaction
 * Represents users who browse but don't engage deeply
 */
export function casualBrowserScenario() {
  group('Browsing', function () {
    // Visit home page
    const homeResponse = http.get(`${BASE_URL}${ENDPOINTS.home}`, {
      tags: { page: 'home' },
    });

    check(homeResponse, {
      'casual: home page loaded': (r) => r.status === 200,
      'casual: page has content': (r) => r.body.length > 0,
    });

    // Realistic think time - reading the page
    sleep(randomIntBetween(2, 5));

    // Maybe view one more page (50% chance)
    if (Math.random() > 0.5) {
      const itemId = randomIntBetween(1, 10);
      const detailResponse = http.get(`${BASE_URL}${ENDPOINTS.detail(itemId)}`, {
        tags: { page: 'quick_view' },
      });

      check(detailResponse, {
        'casual: quick view loaded': (r) => r.status === 200,
      });

      // Brief look
      sleep(randomIntBetween(1, 3));
    }

    // Then leave (bounce)
  });

  sleep(1);
}

// ========================================
// SCENARIO 2: ACTIVE USER
// ========================================

/**
 * Active user - explores multiple pages, performs searches
 * Represents engaged users with intent
 */
export function activeUserScenario() {
  group('Detailed View', function () {
    // Start at home
    http.get(`${BASE_URL}${ENDPOINTS.home}`, {
      tags: { page: 'home' },
    });

    sleep(randomIntBetween(1, 3));

    // Browse multiple items
    const numItemsToView = randomIntBetween(3, 7);

    for (let i = 0; i < numItemsToView; i++) {
      const itemId = randomIntBetween(1, 20);
      const detailResponse = http.get(`${BASE_URL}${ENDPOINTS.detail(itemId)}`, {
        tags: { page: 'detail', user_type: 'active' },
      });

      check(detailResponse, {
        'active: detail page loaded': (r) => r.status === 200,
        'active: has JSON data': (r) => {
          try {
            JSON.parse(r.body);
            return true;
          } catch (e) {
            return false;
          }
        },
      });

      // Read detail page
      sleep(randomIntBetween(2, 4));

      // Return to browse
      http.get(`${BASE_URL}${ENDPOINTS.browse}`, {
        tags: { page: 'browse' },
      });

      sleep(randomIntBetween(1, 2));
    }
  });

  sleep(2);
}

// ========================================
// SCENARIO 3: POWER USER
// ========================================

/**
 * Power user - heavy usage, complex operations, longer sessions
 * Represents your most engaged users or admin operations
 */
export function powerUserScenario() {
  group('Heavy Operations', function () {
    // Extended browsing session
    http.get(`${BASE_URL}${ENDPOINTS.home}`, {
      tags: { page: 'home', user_type: 'power' },
    });

    sleep(1);

    // Perform multiple complex operations
    const numOperations = randomIntBetween(10, 20);

    for (let i = 0; i < numOperations; i++) {
      // Random operation type
      const operation = randomIntBetween(1, 3);

      switch (operation) {
        case 1:
          // Heavy read - fetch and process data
          const listResponse = http.get(`${BASE_URL}${ENDPOINTS.browse}`, {
            tags: { operation: 'heavy_read', user_type: 'power' },
          });

          check(listResponse, {
            'power: data fetched': (r) => r.status === 200,
            'power: large dataset': (r) => r.body.length > 100,
          });
          break;

        case 2:
          // Detailed analysis - view specific item
          const detailId = randomIntBetween(1, 50);
          const detailResponse = http.get(`${BASE_URL}${ENDPOINTS.detail(detailId)}`, {
            tags: { operation: 'detailed_view', user_type: 'power' },
          });

          check(detailResponse, {
            'power: detail retrieved': (r) => r.status === 200 || r.status === 404,
          });
          break;

        case 3:
          // Multiple rapid requests (dashboard-like behavior)
          http.batch([
            ['GET', `${BASE_URL}${ENDPOINTS.home}`, null, { tags: { batch: 'dashboard' } }],
            ['GET', `${BASE_URL}${ENDPOINTS.detail(1)}`, null, { tags: { batch: 'dashboard' } }],
            ['GET', `${BASE_URL}${ENDPOINTS.detail(2)}`, null, { tags: { batch: 'dashboard' } }],
          ]);
          break;
      }

      // Power users work faster
      sleep(randomIntBetween(0.5, 2));
    }

    // Final overview
    http.get(`${BASE_URL}${ENDPOINTS.home}`, {
      tags: { operation: 'final_check', user_type: 'power' },
    });
  });

  sleep(3);
}

// ========================================
// LIFECYCLE HOOKS
// ========================================

export function setup() {
  console.log('\n' + '='.repeat(70));
  console.log(' '.repeat(18) + 'SCENARIO-BASED LOAD TEST');
  console.log('='.repeat(70));
  console.log('Target:', BASE_URL);
  console.log('\nScenarios:');
  console.log('  1. Casual Browsers (70%) - 20 VUs - Light browsing');
  console.log('  2. Active Users    (20%) -  7 VUs - Engaged exploration');
  console.log('  3. Power Users     (10%) -  3 VUs - Heavy operations');
  console.log('\nTotal: 30 concurrent VUs simulating realistic behavior');
  console.log('='.repeat(70));

  // Verify target accessibility
  const response = http.get(BASE_URL);
  if (response.status !== 200 && response.status !== 404) {
    console.warn(`⚠️  Warning: Target may not be accessible. Status: ${response.status}`);
  } else {
    console.log('✓ Target is accessible');
  }

  console.log('='.repeat(70) + '\n');

  return {
    startTime: new Date().toISOString(),
    testType: 'scenario-based',
  };
}

export function teardown(data) {
  console.log('\n' + '='.repeat(70));
  console.log(' '.repeat(18) + 'SCENARIO TEST COMPLETED');
  console.log('='.repeat(70));
  console.log(`Started at: ${data.startTime}`);
  console.log('Review summary.html for per-scenario metrics');
  console.log('='.repeat(70) + '\n');
}

// ========================================
// REPORTING
// ========================================

export function handleSummary(data) {
  const metrics = data.metrics;

  const totalRequests = metrics.http_reqs?.values.count || 0;
  const errorRate = metrics.http_req_failed?.values.rate || 0;
  const p95Duration = metrics.http_req_duration?.values['p(95)'] || 0;

  console.log('\n' + '='.repeat(70));
  console.log(' '.repeat(20) + 'SCENARIO TEST SUMMARY');
  console.log('='.repeat(70));
  console.log(`Total Requests: ${totalRequests.toLocaleString()}`);
  console.log(`Error Rate: ${(errorRate * 100).toFixed(2)}%`);
  console.log(`P95 Response Time: ${p95Duration.toFixed(2)}ms`);
  console.log('\nPer-Scenario Metrics:');
  console.log('  Check summary.html for detailed breakdown by scenario');
  console.log('='.repeat(70) + '\n');

  return {
    'summary.html': htmlReport(data, {
      title: 'Scenario-Based Load Test Report',
      theme: 'default',
    }),
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
  };
}

// ========================================
// CUSTOMIZATION EXAMPLES
// ========================================

/*
// Example 1: E-commerce scenarios
export const options = {
  scenarios: {
    // Window shoppers
    window_shopper: {
      executor: 'ramping-vus',
      exec: 'windowShopperScenario',
      stages: [{ duration: '2m', target: 50 }],
    },

    // Buyers (with authentication)
    buyer: {
      executor: 'ramping-vus',
      exec: 'buyerScenario',
      stages: [{ duration: '2m', target: 10 }],
    },
  },
};

export function buyerScenario() {
  // Login
  const loginRes = http.post(`${BASE_URL}/api/login`, JSON.stringify({
    username: 'testuser',
    password: 'testpass',
  }));

  const token = JSON.parse(loginRes.body).token;

  // Browse products
  http.get(`${BASE_URL}/api/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  sleep(2);

  // Add to cart
  http.post(`${BASE_URL}/api/cart`, JSON.stringify({
    productId: randomIntBetween(1, 100),
    quantity: 1,
  }), {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  sleep(3);

  // Checkout
  http.post(`${BASE_URL}/api/checkout`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// Example 2: Different load patterns per scenario
export const options = {
  scenarios: {
    // Constant load for API monitoring
    api_monitor: {
      executor: 'constant-vus',
      exec: 'apiHealthCheck',
      vus: 1,
      duration: '5m',
    },

    // Spike for user traffic
    user_spike: {
      executor: 'ramping-arrival-rate',
      exec: 'userTrafficScenario',
      startRate: 10,
      timeUnit: '1s',
      stages: [
        { duration: '30s', target: 50 },
        { duration: '1m', target: 50 },
        { duration: '30s', target: 10 },
      ],
    },
  },
};

// Example 3: Time-based scenarios
export function timeBasedScenario() {
  const currentHour = new Date().getHours();

  if (currentHour >= 9 && currentHour <= 17) {
    // Business hours - more activity
    businessHoursFlow();
  } else {
    // Off hours - maintenance operations
    maintenanceFlow();
  }
}

// Example 4: Conditional scenario execution
export function adaptiveScenario() {
  // Make initial request
  const response = http.get(`${BASE_URL}/api/status`);

  if (response.status === 200) {
    // System healthy - normal load
    normalOperations();
  } else {
    // System degraded - reduced load
    lightOperations();
  }
}
*/
