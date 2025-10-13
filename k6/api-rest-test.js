/**
 * K6 REST API Load Test
 *
 * Description: Comprehensive REST API testing with multiple endpoints and HTTP methods.
 * Tests GET, POST, PUT, and DELETE operations with proper validation.
 *
 * Complexity: Intermediate
 * Pattern: Mixed HTTP methods simulating real API usage
 *
 * Usage:
 * 1. Update BASE_URL and ENDPOINTS with your API
 * 2. Adjust authentication if needed
 * 3. Run: k6 run api-rest-test.js
 */

import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { randomString, randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/latest/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

// ========================================
// CONFIGURATION - MODIFY THIS SECTION
// ========================================

const BASE_URL = __ENV.BASE_URL || 'https://test-api.k6.io';

// API Endpoints - Update these for your target API
const ENDPOINTS = {
  list: '/public/crocodiles/',
  create: '/public/crocodiles/',
  detail: (id) => `/public/crocodiles/${id}/`,
  update: (id) => `/public/crocodiles/${id}/`,
  delete: (id) => `/public/crocodiles/${id}/`,

  // Add your custom endpoints here
  // users: '/api/users',
  // products: '/api/products',
  // orders: '/api/orders',
};

// Authentication configuration
const AUTH_TOKEN = __ENV.AUTH_TOKEN || ''; // Set via: k6 run -e AUTH_TOKEN=your-token
const API_KEY = __ENV.API_KEY || '';

// ========================================
// TEST OPTIONS
// ========================================

export const options = {
  // Load configuration
  stages: [
    { duration: '30s', target: 20 },  // Ramp up
    { duration: '2m', target: 20 },   // Stay at 20 VUs
    { duration: '30s', target: 0 },   // Ramp down
  ],

  // Thresholds for API testing
  thresholds: {
    // Overall response time
    'http_req_duration': ['p(95)<800', 'p(99)<1200'],

    // Error rate should be very low for APIs
    'http_req_failed': ['rate<0.01'],

    // Check pass rate
    'checks': ['rate>0.95'],

    // Per-endpoint thresholds
    'http_req_duration{endpoint:list}': ['p(95)<500'],
    'http_req_duration{endpoint:create}': ['p(95)<800'],
    'http_req_duration{endpoint:get}': ['p(95)<400'],
    'http_req_duration{endpoint:update}': ['p(95)<800'],
    'http_req_duration{endpoint:delete}': ['p(95)<600'],

    // Group durations
    'group_duration{group:::API Read Operations}': ['p(95)<1000'],
    'group_duration{group:::API Write Operations}': ['p(95)<1500'],
  },

  // HTTP configuration
  timeout: '60s',
  insecureSkipTLSVerify: true,
};

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Create HTTP headers with authentication
 * @returns {object} Headers object
 */
function getHeaders() {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  // Add authentication if configured
  if (AUTH_TOKEN) {
    headers['Authorization'] = `Bearer ${AUTH_TOKEN}`;
  }

  if (API_KEY) {
    headers['X-API-Key'] = API_KEY;
  }

  return headers;
}

/**
 * Generate random data for creating resources
 * @returns {object} Random data
 */
function generateTestData() {
  return {
    name: `Test-${randomString(8)}`,
    sex: randomIntBetween(0, 1) === 0 ? 'M' : 'F',
    date_of_birth: '2020-01-01',
    age: randomIntBetween(1, 10),
  };
}

// ========================================
// TEST EXECUTION
// ========================================

/**
 * Main test function - simulates real API usage patterns
 */
export default function () {
  const params = { headers: getHeaders() };

  // ========================================
  // GROUP 1: Read Operations (GET requests)
  // ========================================
  group('API Read Operations', function () {
    // Test 1: List all resources
    const listResponse = http.get(
      `${BASE_URL}${ENDPOINTS.list}`,
      { ...params, tags: { endpoint: 'list' } }
    );

    check(listResponse, {
      'list: status is 200': (r) => r.status === 200,
      'list: is JSON': (r) => r.headers['Content-Type']?.includes('application/json'),
      'list: has data array': (r) => {
        try {
          const body = JSON.parse(r.body);
          return Array.isArray(body) || Array.isArray(body.data);
        } catch (e) {
          return false;
        }
      },
      'list: response time < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1);

    // Test 2: Get specific resource by ID
    const resourceId = 1; // In real scenario, get from list response
    const getResponse = http.get(
      `${BASE_URL}${ENDPOINTS.detail(resourceId)}`,
      { ...params, tags: { endpoint: 'get' } }
    );

    check(getResponse, {
      'get: status is 200': (r) => r.status === 200,
      'get: is JSON': (r) => r.headers['Content-Type']?.includes('application/json'),
      'get: has id field': (r) => {
        try {
          const body = JSON.parse(r.body);
          return body.hasOwnProperty('id') || body.hasOwnProperty('_id');
        } catch (e) {
          return false;
        }
      },
      'get: response time < 400ms': (r) => r.timings.duration < 400,
    });

    sleep(1);
  });

  // ========================================
  // GROUP 2: Write Operations (POST, PUT, DELETE)
  // ========================================
  group('API Write Operations', function () {
    // Test 3: Create new resource (POST)
    const newData = generateTestData();
    const createPayload = JSON.stringify(newData);

    const createResponse = http.post(
      `${BASE_URL}${ENDPOINTS.create}`,
      createPayload,
      { ...params, tags: { endpoint: 'create' } }
    );

    const createdSuccessfully = check(createResponse, {
      'create: status is 201 or 200': (r) => r.status === 201 || r.status === 200,
      'create: is JSON': (r) => r.headers['Content-Type']?.includes('application/json'),
      'create: returns created object': (r) => {
        try {
          const body = JSON.parse(r.body);
          return body.hasOwnProperty('id') || body.hasOwnProperty('_id');
        } catch (e) {
          return false;
        }
      },
      'create: response time < 800ms': (r) => r.timings.duration < 800,
    });

    let createdId = null;
    if (createdSuccessfully && createResponse.status < 300) {
      try {
        const body = JSON.parse(createResponse.body);
        createdId = body.id || body._id;
      } catch (e) {
        console.error('Failed to parse created resource ID');
      }
    }

    sleep(1);

    // Test 4: Update resource (PUT)
    if (createdId) {
      const updateData = {
        ...newData,
        name: `Updated-${randomString(8)}`,
      };
      const updatePayload = JSON.stringify(updateData);

      const updateResponse = http.put(
        `${BASE_URL}${ENDPOINTS.update(createdId)}`,
        updatePayload,
        { ...params, tags: { endpoint: 'update' } }
      );

      check(updateResponse, {
        'update: status is 200 or 204': (r) => r.status === 200 || r.status === 204,
        'update: response time < 800ms': (r) => r.timings.duration < 800,
      });

      sleep(1);

      // Test 5: Delete resource (DELETE)
      const deleteResponse = http.del(
        `${BASE_URL}${ENDPOINTS.delete(createdId)}`,
        null,
        { ...params, tags: { endpoint: 'delete' } }
      );

      check(deleteResponse, {
        'delete: status is 200 or 204': (r) => r.status === 200 || r.status === 204,
        'delete: response time < 600ms': (r) => r.timings.duration < 600,
      });

      sleep(1);

      // Test 6: Verify deletion (should return 404)
      const verifyResponse = http.get(
        `${BASE_URL}${ENDPOINTS.detail(createdId)}`,
        { ...params, tags: { endpoint: 'verify_delete' } }
      );

      check(verifyResponse, {
        'verify: resource not found': (r) => r.status === 404 || r.status === 410,
      });
    }
  });

  // Pause before next iteration
  sleep(2);
}

// ========================================
// LIFECYCLE HOOKS
// ========================================

export function setup() {
  console.log('\n' + '='.repeat(70));
  console.log(' '.repeat(20) + 'REST API LOAD TEST');
  console.log('='.repeat(70));
  console.log('Target:', BASE_URL);
  console.log('Testing: GET, POST, PUT, DELETE operations');
  console.log('Load: 20 VUs for 2 minutes');
  console.log('='.repeat(70));

  // Verify API is accessible
  const response = http.get(BASE_URL);
  if (response.status !== 200 && response.status !== 404) {
    console.warn(`⚠️  Warning: API may not be accessible. Status: ${response.status}`);
  } else {
    console.log('✓ API is accessible');
  }

  console.log('='.repeat(70) + '\n');

  return {
    startTime: new Date().toISOString(),
    testType: 'api-rest',
  };
}

export function teardown(data) {
  console.log('\n' + '='.repeat(70));
  console.log(' '.repeat(20) + 'API TEST COMPLETED');
  console.log('='.repeat(70));
  console.log(`Started at: ${data.startTime}`);
  console.log('Check summary.html for detailed metrics per endpoint');
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

  console.log('\n' + '='.repeat(70));
  console.log(' '.repeat(25) + 'API TEST SUMMARY');
  console.log('='.repeat(70));
  console.log(`Total API Requests: ${totalRequests.toLocaleString()}`);
  console.log(`Error Rate: ${(errorRate * 100).toFixed(2)}%`);
  console.log(`Avg Response Time: ${avgDuration.toFixed(2)}ms`);
  console.log(`P95 Response Time: ${p95Duration.toFixed(2)}ms`);
  console.log('='.repeat(70) + '\n');

  return {
    'summary.html': htmlReport(data, {
      title: 'REST API Load Test Report',
      theme: 'default',
    }),
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
  };
}

// ========================================
// CUSTOMIZATION EXAMPLES
// ========================================

/*
// Example 1: Test authentication endpoint
group('Authentication', function () {
  const loginPayload = JSON.stringify({
    username: 'testuser',
    password: 'testpass',
  });

  const loginResponse = http.post(
    `${BASE_URL}/api/auth/login`,
    loginPayload,
    { headers: getHeaders() }
  );

  check(loginResponse, {
    'login successful': (r) => r.status === 200,
    'received token': (r) => {
      try {
        const body = JSON.parse(r.body);
        return body.token || body.access_token;
      } catch (e) {
        return false;
      }
    },
  });
});

// Example 2: Test with pagination
const page = randomIntBetween(1, 10);
const limit = 20;
const paginatedResponse = http.get(
  `${BASE_URL}/api/items?page=${page}&limit=${limit}`
);

check(paginatedResponse, {
  'pagination: has items': (r) => {
    const body = JSON.parse(r.body);
    return body.items && body.items.length <= limit;
  },
  'pagination: has metadata': (r) => {
    const body = JSON.parse(r.body);
    return body.total && body.page;
  },
});

// Example 3: Test with search/filter
const searchQuery = 'test';
const searchResponse = http.get(
  `${BASE_URL}/api/search?q=${encodeURIComponent(searchQuery)}`
);

check(searchResponse, {
  'search: returns results': (r) => r.status === 200,
  'search: results are relevant': (r) => {
    const body = JSON.parse(r.body);
    return body.results && body.results.length >= 0;
  },
});

// Example 4: Test file upload
const boundary = '----WebKitFormBoundary' + randomString(16);
const fileData = `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="test.txt"\r\nContent-Type: text/plain\r\n\r\nTest file content\r\n--${boundary}--`;

const uploadResponse = http.post(
  `${BASE_URL}/api/upload`,
  fileData,
  {
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
    },
  }
);

check(uploadResponse, {
  'upload successful': (r) => r.status === 200 || r.status === 201,
});

// Example 5: Batch operations
const batchPayload = JSON.stringify({
  operations: [
    { method: 'create', data: { name: 'Item 1' } },
    { method: 'create', data: { name: 'Item 2' } },
    { method: 'create', data: { name: 'Item 3' } },
  ],
});

const batchResponse = http.post(
  `${BASE_URL}/api/batch`,
  batchPayload,
  { headers: getHeaders() }
);

check(batchResponse, {
  'batch: all operations successful': (r) => {
    const body = JSON.parse(r.body);
    return body.results && body.results.every(result => result.success);
  },
});
*/
