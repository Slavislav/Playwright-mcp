/**
 * K6 Utility Functions
 * Reusable helper functions for load testing
 */

import { check } from 'k6';
import { randomString, randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

/**
 * Generate a random email address
 * @returns {string} Random email
 */
export function generateRandomEmail() {
  const randomNum = randomIntBetween(1, 100000);
  const randomName = randomString(8).toLowerCase();
  return `${randomName}${randomNum}@example.com`;
}

/**
 * Generate a random username
 * @returns {string} Random username
 */
export function generateRandomUsername() {
  const randomNum = randomIntBetween(1, 10000);
  return `user${randomNum}`;
}

/**
 * Generate random user data
 * @returns {object} User data object
 */
export function generateUserData() {
  return {
    username: generateRandomUsername(),
    email: generateRandomEmail(),
    firstName: randomString(6),
    lastName: randomString(8),
    age: randomIntBetween(18, 80),
  };
}

/**
 * Generate a random product ID
 * @param {number} min Minimum ID
 * @param {number} max Maximum ID
 * @returns {number} Random product ID
 */
export function getRandomProductId(min = 1, max = 100) {
  return randomIntBetween(min, max);
}

/**
 * Standard checks for successful HTTP responses
 * @param {object} response HTTP response object
 * @param {string} description Optional description for the check
 * @returns {boolean} Check result
 */
export function checkSuccess(response, description = '') {
  const prefix = description ? `${description}: ` : '';
  return check(response, {
    [`${prefix}status is 200`]: (r) => r.status === 200,
    [`${prefix}response time < 1s`]: (r) => r.timings.duration < 1000,
    [`${prefix}has body`]: (r) => r.body && r.body.length > 0,
  });
}

/**
 * Checks for JSON API responses
 * @param {object} response HTTP response object
 * @param {string} description Optional description
 * @returns {boolean} Check result
 */
export function checkJsonResponse(response, description = 'JSON') {
  return check(response, {
    [`${description}: status is 200`]: (r) => r.status === 200,
    [`${description}: is JSON`]: (r) =>
      r.headers['Content-Type'] && r.headers['Content-Type'].includes('application/json'),
    [`${description}: has valid JSON body`]: (r) => {
      try {
        JSON.parse(r.body);
        return true;
      } catch (e) {
        return false;
      }
    },
    [`${description}: response time < 500ms`]: (r) => r.timings.duration < 500,
  });
}

/**
 * Checks for created resources (POST requests)
 * @param {object} response HTTP response object
 * @param {string} description Optional description
 * @returns {boolean} Check result
 */
export function checkCreated(response, description = 'Create') {
  return check(response, {
    [`${description}: status is 201`]: (r) => r.status === 201,
    [`${description}: response time < 1s`]: (r) => r.timings.duration < 1000,
    [`${description}: has body`]: (r) => r.body && r.body.length > 0,
  });
}

/**
 * Checks for updated resources (PUT/PATCH requests)
 * @param {object} response HTTP response object
 * @param {string} description Optional description
 * @returns {boolean} Check result
 */
export function checkUpdated(response, description = 'Update') {
  return check(response, {
    [`${description}: status is 200 or 204`]: (r) => r.status === 200 || r.status === 204,
    [`${description}: response time < 1s`]: (r) => r.timings.duration < 1000,
  });
}

/**
 * Checks for deleted resources (DELETE requests)
 * @param {object} response HTTP response object
 * @param {string} description Optional description
 * @returns {boolean} Check result
 */
export function checkDeleted(response, description = 'Delete') {
  return check(response, {
    [`${description}: status is 200 or 204`]: (r) => r.status === 200 || r.status === 204,
    [`${description}: response time < 1s`]: (r) => r.timings.duration < 1000,
  });
}

/**
 * Create standard HTTP headers for JSON requests
 * @param {object} additionalHeaders Optional additional headers
 * @returns {object} Headers object
 */
export function createJsonHeaders(additionalHeaders = {}) {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...additionalHeaders,
    },
  };
}

/**
 * Create headers with authentication token
 * @param {string} token Bearer token
 * @param {object} additionalHeaders Optional additional headers
 * @returns {object} Headers object with authentication
 */
export function createAuthHeaders(token, additionalHeaders = {}) {
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...additionalHeaders,
    },
  };
}

/**
 * Log response details for debugging
 * @param {object} response HTTP response object
 * @param {string} label Optional label for the log
 */
export function logResponse(response, label = 'Response') {
  console.log(`[${label}] Status: ${response.status}, Duration: ${response.timings.duration}ms`);
  if (response.status >= 400) {
    console.log(`[${label}] Error Body:`, response.body.substring(0, 200));
  }
}

/**
 * Parse JSON response safely
 * @param {object} response HTTP response object
 * @returns {object|null} Parsed JSON or null on error
 */
export function parseJsonResponse(response) {
  try {
    return JSON.parse(response.body);
  } catch (e) {
    console.error('Failed to parse JSON response:', e.message);
    return null;
  }
}

/**
 * Create a realistic think time with variation
 * @param {number} baseSeconds Base seconds to sleep
 * @param {number} variationPercent Variation percentage (0-100)
 * @returns {number} Calculated sleep time
 */
export function calculateThinkTime(baseSeconds, variationPercent = 20) {
  const variation = baseSeconds * (variationPercent / 100);
  const min = baseSeconds - variation;
  const max = baseSeconds + variation;
  return min + Math.random() * (max - min);
}

/**
 * Generate a random search query
 * @returns {string} Random search term
 */
export function generateSearchQuery() {
  const queries = [
    'test', 'product', 'service', 'item', 'category',
    'new', 'best', 'top', 'popular', 'featured'
  ];
  return queries[randomIntBetween(0, queries.length - 1)];
}

/**
 * Generate random pagination parameters
 * @param {number} maxPage Maximum page number
 * @returns {object} Page and limit parameters
 */
export function generatePaginationParams(maxPage = 10) {
  return {
    page: randomIntBetween(1, maxPage),
    limit: randomIntBetween(10, 50),
  };
}

/**
 * Build query string from parameters
 * @param {object} params Query parameters
 * @returns {string} Query string
 */
export function buildQueryString(params) {
  const queryParts = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  return queryParts ? `?${queryParts}` : '';
}

/**
 * Generate random filter parameters for API requests
 * @returns {object} Filter parameters
 */
export function generateFilterParams() {
  const filters = {
    category: ['electronics', 'clothing', 'books', 'food', 'toys'],
    sortBy: ['price', 'name', 'date', 'rating'],
    order: ['asc', 'desc'],
  };

  return {
    category: filters.category[randomIntBetween(0, filters.category.length - 1)],
    sortBy: filters.sortBy[randomIntBetween(0, filters.sortBy.length - 1)],
    order: filters.order[randomIntBetween(0, filters.order.length - 1)],
  };
}
