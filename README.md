# SDET Challenge API

**🧪 Take-Home Challenge for Software Development Engineers in Test (SDET)**

A TypeScript Node.js Express API with empty test files for candidates to implement comprehensive test automation.

## 🛠️ Prerequisites

Before starting this challenge, ensure you have the following tools installed:

### Required Tools
- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v9.0.0 or higher) - Comes with Node.js
- **Git** (v2.30.0 or higher) - [Download here](https://git-scm.com/)

### Recommended Tools
- **Visual Studio Code** - [Download here](https://code.visualstudio.com/)
- **Playwright VS Code Extension** - For test debugging and development

### Verify Installation
```bash
# Check Node.js version
node --version

# Check npm version  
npm --version

# Check Git version
git --version
```

**Minimum Requirements:**
- Node.js 18+
- npm 9+
- Git 2.30+
- Modern web browser (Chrome, Firefox, or Safari)

### 🚨 Troubleshooting

**Common Issues:**
- **Node.js too old**: Use [nvm](https://github.com/nvm-sh/nvm) to install/switch Node.js versions
- **npm permission errors**: Consider using [nvm](https://github.com/nvm-sh/nvm) or [configure npm](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)
- **Git not configured**: Run `git config --global user.name "Your Name"` and `git config --global user.email "your@email.com"`
- **Port 3000 in use**: Stop other services or change the port in the application

## 🚀 Quick Start

```bash
npm install
npm start
```

The server will start on `http://localhost:3000`

## 📋 API Endpoints

### 📚 API Documentation
Interactive Swagger documentation is available at: **http://localhost:3000/api-docs**

The Swagger UI provides:
- Complete API specification
- Interactive endpoint testing
- Request/response examples
- Schema definitions

### GET /api/logs
Returns a JSON response with log entries for testing:

```json
{
  "logs": [
    "[INFO] 2025-06-13T14:22:31Z - User logged in",
    "[ERROR] 2025-06-13T14:23:05Z - Failed to fetch profile",
    "[INFO] 2025-06-13T14:25:00Z - User logged out"
  ]
}
```

### GET / (Health Check)
Returns API status and available endpoints (including documentation link).

## 🎯 SDET Challenge Instructions

**Your Task:** Complete the automated testing suite for this API.

### 📋 Challenge Requirements

**Step 1: Verify Prerequisites**
```bash
# Verify you have the required tools (see Prerequisites section above)
node --version  # Should be v18.0.0+
npm --version   # Should be v9.0.0+
git --version   # Should be v2.30.0+
```

**Step 2: Setup & Exploration**
```bash
# Clone this repository
git clone <repository-url>
cd sdet-challenge

# Install dependencies
npm install

# Start the application
npm run dev
```

**Step 3: Explore the API**
- Visit `http://localhost:3000` - health check endpoint
- Visit `http://localhost:3000/api/logs` - logs endpoint  
- Visit `http://localhost:3000/api-docs` - interactive API documentation

**Step 4: Implement Test Cases**
Complete the empty test files in the `tests/` directory:

- `tests/api.spec.ts` - API endpoint testing
- `tests/logParser.spec.ts` - Log parser function testing + integration
- `tests/swagger-ui.spec.ts` - UI testing for Swagger documentation

**Step 5: Test Implementation**
```bash
# Run your tests
npm test

# Debug tests visually
npm run test:headed

# View test report
npm run test:report
```

**Step 6: Submit Your Solution**
```bash
# Create a branch with your name (format: firstname-lastname)
git checkout -b john-smith

# Commit your test implementations
git add tests/
git commit -m "Implement SDET test suite"

# Push your branch
git push origin john-smith

# Create a pull request for review
```

### 🎯 What You Should Test

**API Testing (`api.spec.ts`):**
- ✅ GET `/api/logs` returns correct JSON structure
- ✅ GET `/` health check returns status information  
- ✅ Validate response schemas and status codes
- ✅ Test error handling (404s, invalid methods)
- ✅ Performance and concurrent request handling

**Integration Testing (`logParser.spec.ts`):**
- ✅ Fetch logs from API and parse with `countLogLevels()` function
- ✅ Test edge cases: empty logs, invalid formats, mixed levels
- ✅ Validate that parser correctly counts INFO, ERROR, WARN levels
- ✅ Type safety and data validation

**UI Testing (`swagger-ui.spec.ts`):**
- ✅ Swagger documentation loads and displays correctly
- ✅ API endpoints are documented and testable
- ✅ Interactive "Try it out" functionality works
- ✅ Responsive design across different viewports

### 📊 Evaluation Criteria

- **Test Coverage**: Comprehensive testing of all endpoints and functions
- **Test Quality**: Clear, maintainable, and well-structured test cases
- **Edge Cases**: Handling of error conditions and boundary cases
- **Integration**: Tests that combine API calls with utility functions
- **Best Practices**: Use of TypeScript, async/await, proper assertions
- **Git Workflow**: Proper branch naming (firstname-lastname) and clean commits

### Using the Log Parser

```typescript
import countLogLevels, { LogLevelCounts } from '../src/logParser';

// Example usage in tests:
const logs: string[] = [
  "[INFO] 2025-06-13T14:22:31Z - User logged in",
  "[ERROR] 2025-06-13T14:23:05Z - Failed to fetch profile",
  "[INFO] 2025-06-13T14:25:00Z - User logged out"
];

const counts: LogLevelCounts = countLogLevels(logs);
console.log(counts); // { INFO: 2, ERROR: 1 }
```

## 📁 Project Structure

```
sdet-challenge/
├── src/
│   ├── index.ts           # TypeScript Express server
│   └── logParser.ts       # TypeScript log parsing utility
├── tests/
│   ├── api.spec.ts        # Playwright API tests
│   ├── logParser.spec.ts  # Playwright integration tests
│   └── swagger-ui.spec.ts # Playwright UI tests
├── dist/                  # Compiled JavaScript (auto-generated)
├── playwright.config.ts   # Playwright test configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🐳 Docker Extension (Optional)

To containerize this app, create a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t sdet-challenge .
docker run -p 3000:3000 sdet-challenge
```

## 🔄 CI/CD Extension (Optional)

Example GitHub Actions workflow (`.github/workflows/ci.yml`):

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm start &
      - run: curl http://localhost:3000/api/logs
```

## 🧪 Playwright Testing Framework

This project includes **empty Playwright test files** for candidates to implement:

### 🚀 Quick Start Testing
```bash
# Run all tests
npm test

# Run tests with browser UI (headed mode)
npm run test:headed

# Debug tests interactively
npm run test:debug

# View test report
npm run test:report
```

### 📁 Test Structure
```
tests/
├── api.spec.ts           # API endpoint testing
├── logParser.spec.ts     # Log parser function testing + integration
└── swagger-ui.spec.ts    # Browser UI testing for Swagger docs
```

### 📁 Test Files to Complete

**`tests/api.spec.ts`** (Empty - implement API testing)
**`tests/logParser.spec.ts`** (Empty - implement integration testing)  
**`tests/swagger-ui.spec.ts`** (Empty - implement UI testing)

### 🎯 Expected Test Coverage

**API Testing (`api.spec.ts`):**
- 🔲 Endpoint response validation
- 🔲 Status code verification
- 🔲 JSON schema validation
- 🔲 Error handling (404, invalid methods)
- 🔲 Performance testing (response times)
- 🔲 Concurrent request handling

**Integration Testing (`logParser.spec.ts`):**
- 🔲 Fetch logs from API + parse with `countLogLevels()`
- 🔲 Unit tests for log parser edge cases
- 🔲 Data validation and type checking
- 🔲 Invalid log format handling

**UI Testing (`swagger-ui.spec.ts`):**
- 🔲 Swagger documentation loads correctly
- 🔲 Interactive API testing through UI
- 🔲 Responsive design testing
- 🔲 Cross-browser compatibility

### 💡 Testing Techniques to Use

- **API Testing**: Use Playwright's `request` context for pure API testing
- **Integration Testing**: Combine API calls with utility function testing
- **UI Testing**: Test documentation interfaces and user interactions
- **Cross-browser Testing**: Verify functionality across Chrome, Firefox, Safari
- **TypeScript**: Leverage type safety in your test implementations
- **Async/Await**: Handle asynchronous operations properly
- **Test Organization**: Use descriptive test names and proper grouping

## 🔧 Development Workflow

```bash
# Development with hot reload
npm run dev

# Build TypeScript
npm run build

# Production start
npm start

# Run all tests
npm test

# Test with browser UI
npm run test:headed
```

### 📋 Submission Requirements

- **Branch Naming**: Create a branch with format `firstname-lastname` (e.g., `john-smith`)
- **Commit Message**: Use clear, descriptive commit messages
- **Pull Request**: Submit via pull request for code review
- **Test Coverage**: All test files must have meaningful implementations

## 📝 Notes

- **TypeScript**: Full type safety for better development experience
- **Playwright Testing**: Comprehensive test suite covering API, integration, and UI testing
- **Express + Swagger**: Professional API documentation with interactive testing
- **SDET-Ready**: Multiple testing approaches demonstrated for interview scenarios
- **CI/CD Compatible**: Playwright auto-starts server and runs tests in headless mode
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Multi-Browser**: Tests run on Chromium, Firefox, and WebKit
- **Version Controlled**: Node.js 18+ and npm 9+ requirements enforced in package.json 