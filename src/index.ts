import express, { Application, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app: Application = express();
const PORT: number = 3000;

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SDET Challenge API',
      version: '1.0.0',
      description: 'API for SDET automation testing challenges. Provides log data for parsing and analysis.',
      contact: {
        name: 'SDET Challenge',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/index.ts'], // Path to the API files
};

const specs = swaggerJsdoc(swaggerOptions);

// Middleware to parse JSON
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'SDET Challenge API Documentation'
}));

/**
 * @swagger
 * components:
 *   schemas:
 *     LogsResponse:
 *       type: object
 *       properties:
 *         logs:
 *           type: array
 *           items:
 *             type: string
 *             example: "[INFO] 2025-06-13T14:22:31Z - User logged in"
 *           description: Array of log entries with timestamps and messages
 *       example:
 *         logs:
 *           - "[INFO] 2025-06-13T14:22:31Z - User logged in"
 *           - "[ERROR] 2025-06-13T14:23:05Z - Failed to fetch profile"
 *           - "[INFO] 2025-06-13T14:25:00Z - User logged out"
 *     HealthResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "SDET Challenge API is running"
 *         endpoints:
 *           type: object
 *           properties:
 *             logs:
 *               type: string
 *               example: "/api/logs"
 *             docs:
 *               type: string
 *               example: "/api-docs"
 */

/**
 * Interface for the logs API response
 */
interface LogsResponse {
  logs: string[];
}

/**
 * Interface for the health check response
 */
interface HealthResponse {
  message: string;
  endpoints: {
    logs: string;
    docs: string;
  };
}

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Retrieve application logs
 *     description: Returns a collection of log entries for SDET testing. Each log entry includes a level (INFO, ERROR, WARN), timestamp, and message. Use these logs with the logParser.ts countLogLevels() function for testing.
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: Successfully retrieved logs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogsResponse'
 *       500:
 *         description: Internal server error
 */
app.get('/api/logs', (req: Request, res: Response) => {
  const logs: string[] = [
    "[INFO] 2025-06-13T14:22:31Z - User logged in",
    "[ERROR] 2025-06-13T14:23:05Z - Failed to fetch profile",
    "[INFO] 2025-06-13T14:25:00Z - User logged out"
  ];

  res.json({ logs });
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check and API information
 *     description: Returns the status of the API and available endpoints. Use this to verify the service is running.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is running successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 */
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'SDET Challenge API is running',
    endpoints: {
      logs: '/api/logs',
      docs: '/api-docs'
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 SDET Challenge API server is running on http://localhost:${PORT}`);
  console.log(`📋 Logs endpoint: http://localhost:${PORT}/api/logs`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`🔍 Health check: http://localhost:${PORT}/`);
});

export default app; 