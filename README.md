# SDET Challenge API

A minimal Node.js Express app designed for SDET automation testing challenges.

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

## 🧪 SDET Testing Challenge

This app is designed for SDET candidates to:

1. **Fetch logs** from the `/api/logs` endpoint
2. **Parse and analyze** the logs using the provided `logParser.js` function
3. **Write automated tests** that verify log parsing functionality

### Using the Log Parser

```javascript
const countLogLevels = require('./logParser');

// Example usage in tests:
const logs = [
  "[INFO] 2025-06-13T14:22:31Z - User logged in",
  "[ERROR] 2025-06-13T14:23:05Z - Failed to fetch profile",
  "[INFO] 2025-06-13T14:25:00Z - User logged out"
];

const counts = countLogLevels(logs);
console.log(counts); // { INFO: 2, ERROR: 1 }
```

## 📁 Project Structure

```
sdet-challenge/
├── index.js          # Express server
├── logParser.js       # Log parsing utility function
├── package.json       # Dependencies and scripts
└── README.md         # This file
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

## 🧪 Testing Ideas for SDET Candidates

- **API Testing**: Use Swagger UI or automation tools to verify endpoint responses and status codes
- **Interactive Testing**: Use the Swagger documentation at `/api-docs` to explore and test endpoints
- **Log Parsing**: Test the `countLogLevels` function with various inputs
- **Integration Testing**: Fetch logs from API and parse them with the provided function
- **Edge Cases**: Test with malformed logs, empty arrays, different log levels
- **Performance Testing**: Test API response times and load handling
- **Error Handling**: Test invalid endpoints, methods, and malformed requests
- **Schema Validation**: Verify API responses match the Swagger schema definitions

## 📝 Notes

- The app exports the Express app instance for testing purposes
- Logs are hardcoded for consistency in testing scenarios
- The `logParser.js` function is separate to allow isolated unit testing
- Swagger documentation provides interactive API exploration and testing
- Dependencies include Express, Swagger JSDoc, and Swagger UI Express for complete functionality 