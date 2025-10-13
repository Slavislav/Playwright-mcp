/**
 * K6 Configuration Template
 * Centralized configuration for load tests
 *
 * Usage:
 * import { config } from './config.js';
 *
 * Then access values like: config.baseUrl, config.thresholds, etc.
 */

/**
 * Main configuration object
 * Modify these values to match your test requirements
 */
export const config = {
  // ========================================
  // TARGET CONFIGURATION
  // ========================================
  baseUrl: __ENV.BASE_URL || 'https://example.com',

  // API endpoints (modify based on your target)
  endpoints: {
    home: '/',
    api: {
      users: '/api/users',
      products: '/api/products',
      orders: '/api/orders',
      auth: '/api/auth/login',
    },
  },

  // ========================================
  // LOAD TEST PARAMETERS
  // ========================================
  load: {
    // Light load (for quick tests)
    light: {
      vus: 10,
      duration: '30s',
    },

    // Medium load
    medium: {
      vus: 50,
      duration: '2m',
    },

    // Heavy load
    heavy: {
      vus: 100,
      duration: '5m',
    },

    // Stress test stages
    stressStages: [
      { duration: '30s', target: 10 },
      { duration: '1m', target: 50 },
      { duration: '1m', target: 100 },
      { duration: '1m', target: 150 },
      { duration: '30s', target: 0 },
    ],

    // Spike test stages
    spikeStages: [
      { duration: '10s', target: 10 },
      { duration: '5s', target: 100 },
      { duration: '30s', target: 100 },
      { duration: '5s', target: 10 },
      { duration: '10s', target: 0 },
    ],

    // Soak test configuration
    soak: {
      stages: [
        { duration: '2m', target: 50 },
        { duration: '10m', target: 50 },
        { duration: '2m', target: 0 },
      ],
    },
  },

  // ========================================
  // THRESHOLDS
  // ========================================
  thresholds: {
    // Strict thresholds (for production-ready systems)
    strict: {
      'http_req_duration': ['p(95)<300', 'p(99)<500'],
      'http_req_failed': ['rate<0.01'],
      'checks': ['rate>0.99'],
    },

    // Moderate thresholds (for testing environments)
    moderate: {
      'http_req_duration': ['p(95)<500', 'p(99)<1000'],
      'http_req_failed': ['rate<0.05'],
      'checks': ['rate>0.95'],
    },

    // Relaxed thresholds (for development or unstable environments)
    relaxed: {
      'http_req_duration': ['p(95)<1000', 'p(99)<2000'],
      'http_req_failed': ['rate<0.10'],
      'checks': ['rate>0.90'],
    },
  },

  // ========================================
  // AUTHENTICATION
  // ========================================
  auth: {
    // Set these via environment variables for security
    // Example: k6 run -e API_KEY=your-key script.js
    apiKey: __ENV.API_KEY || '',
    bearerToken: __ENV.BEARER_TOKEN || '',

    // Or use test credentials (NOT for production!)
    testUser: {
      username: 'testuser',
      password: 'testpass123',
      email: 'test@example.com',
    },
  },

  // ========================================
  // HTTP OPTIONS
  // ========================================
  httpOptions: {
    // Request timeout
    timeout: '60s',

    // Disable SSL verification (testing only!)
    insecureSkipTLSVerify: true,

    // Maximum redirects to follow
    maxRedirects: 4,

    // Batch requests for better performance
    batch: 10,
    batchPerHost: 6,
  },

  // ========================================
  // THINK TIME (User pacing)
  // ========================================
  thinkTime: {
    min: 1,  // Minimum seconds between actions
    max: 3,  // Maximum seconds between actions
    avg: 2,  // Average think time
  },

  // ========================================
  // REPORTING
  // ========================================
  reporting: {
    // HTML report configuration
    html: {
      enabled: true,
      filename: 'summary.html',
      title: 'K6 Load Test Report',
      theme: 'default', // Options: 'default', 'classic', 'bootstrap'
    },

    // JSON output
    json: {
      enabled: false,
      filename: 'results.json',
    },
  },
};

/**
 * Get HTTP headers for JSON requests
 * @returns {object} Headers object
 */
export function getJsonHeaders() {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
}

/**
 * Get HTTP headers with authentication
 * @param {string} authType Type of auth: 'bearer', 'apikey', or 'basic'
 * @returns {object} Headers object with authentication
 */
export function getAuthHeaders(authType = 'bearer') {
  const headers = getJsonHeaders();

  switch (authType) {
    case 'bearer':
      if (config.auth.bearerToken) {
        headers['Authorization'] = `Bearer ${config.auth.bearerToken}`;
      }
      break;
    case 'apikey':
      if (config.auth.apiKey) {
        headers['X-API-Key'] = config.auth.apiKey;
      }
      break;
    case 'basic':
      const credentials = btoa(`${config.auth.testUser.username}:${config.auth.testUser.password}`);
      headers['Authorization'] = `Basic ${credentials}`;
      break;
  }

  return headers;
}

/**
 * Build full URL from endpoint path
 * @param {string} path Endpoint path
 * @returns {string} Full URL
 */
export function buildUrl(path) {
  const baseUrl = config.baseUrl.endsWith('/')
    ? config.baseUrl.slice(0, -1)
    : config.baseUrl;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Get options for basic load test
 * @param {string} intensity 'light', 'medium', or 'heavy'
 * @param {string} thresholdLevel 'strict', 'moderate', or 'relaxed'
 * @returns {object} K6 options object
 */
export function getBasicOptions(intensity = 'light', thresholdLevel = 'moderate') {
  return {
    ...config.load[intensity],
    thresholds: config.thresholds[thresholdLevel],
    ...config.httpOptions,
  };
}

/**
 * Get options for stress test
 * @param {string} thresholdLevel 'strict', 'moderate', or 'relaxed'
 * @returns {object} K6 options object
 */
export function getStressOptions(thresholdLevel = 'moderate') {
  return {
    stages: config.load.stressStages,
    thresholds: config.thresholds[thresholdLevel],
    ...config.httpOptions,
  };
}

/**
 * Get options for spike test
 * @param {string} thresholdLevel 'strict', 'moderate', or 'relaxed'
 * @returns {object} K6 options object
 */
export function getSpikeOptions(thresholdLevel = 'moderate') {
  return {
    stages: config.load.spikeStages,
    thresholds: config.thresholds[thresholdLevel],
    ...config.httpOptions,
  };
}

/**
 * Get options for soak test
 * @param {string} thresholdLevel 'strict', 'moderate', or 'relaxed'
 * @returns {object} K6 options object
 */
export function getSoakOptions(thresholdLevel = 'moderate') {
  return {
    stages: config.load.soak.stages,
    thresholds: config.thresholds[thresholdLevel],
    ...config.httpOptions,
  };
}

/**
 * Calculate random think time within configured range
 * @returns {number} Think time in seconds
 */
export function getThinkTime() {
  const { min, max } = config.thinkTime;
  return min + Math.random() * (max - min);
}

// Export default for convenience
export default config;
