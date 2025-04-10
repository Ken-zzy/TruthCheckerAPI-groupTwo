import swaggerJSDoc from 'swagger-jsdoc';
import { Options } from 'swagger-jsdoc';

export const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TruthChecker API',
      version: '1.0.0',
      description: 'API Documentation for TruthChecker Application',
    },
    servers: [
      {
        url: 'http://localhost:4000', // or your deployed URL
      },
    ],
    paths: {}, // <-- Add this line to fix the error
  },
  apis: ['src/routes/*.ts'], // Path to your route files for swagger doc generation
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
