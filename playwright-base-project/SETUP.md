# Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

## Installation Steps

### 1. Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

Using pnpm:
```bash
pnpm install
```

### 2. Install Playwright Browsers

```bash
npx playwright install
```

Or install specific browsers:
```bash
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

### 3. Verify Installation

Run the example tests:
```bash
npm test
```

## Configuration

### Environment Variables

1. Copy the environment template:
```bash
cp .env.example .env
```

2. Update the values in `.env` file according to your environment

### Playwright Configuration

Edit `playwright.config.ts` to customize:

- **Base URL**: Change the `baseURL` in the `use` section
- **Browsers**: Enable/disable browsers in the `projects` section
- **Timeouts**: Adjust timeout values
- **Reporters**: Configure test reporters
- **Screenshots/Videos**: Control capture settings

## Project Structure

```
playwright-base-project/
├── tests/                      # Test files
│   ├── example.spec.ts        # Basic test examples
│   ├── using-page-objects.spec.ts  # POM examples
│   ├── data-driven.spec.ts    # Data-driven test examples
│   └── fixtures.spec.ts       # Custom fixtures examples
├── page-objects/              # Page Object Model
│   ├── BasePage.ts           # Base page class
│   └── ExamplePage.ts        # Example page object
├── helpers/                   # Utility functions
│   └── testHelpers.ts        # Common helper functions
├── test-data/                 # Test data files
│   └── users.json            # User test data
├── playwright.config.ts       # Playwright configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## Common Commands

```bash
# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Run tests in UI mode (interactive)
npm run test:ui

# Debug tests
npm run test:debug

# Generate code (record actions)
npm run test:codegen

# View last test report
npm run test:report

# Run specific test file
npx playwright test tests/example.spec.ts

# Run tests matching a pattern
npx playwright test -g "search"

# Run tests in a specific browser
npx playwright test --project=chromium
```

## Troubleshooting

### Browsers not installed
```bash
npx playwright install
```

### Permission errors on Linux
```bash
npx playwright install-deps
```

### VS Code Integration

Install the Playwright Test for VS Code extension for:
- Running tests from the editor
- Debugging tests
- Test explorer view

## Next Steps

1. Update `playwright.config.ts` with your application's base URL
2. Create page objects for your application pages
3. Write tests for your application
4. Set up CI/CD pipeline (see CI examples in Playwright docs)

## Resources

- [Playwright Documentation](https://playwright.dev)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Community Discord](https://aka.ms/playwright/discord)




