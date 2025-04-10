import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Name',
      version: '1.0.0',
      description: 'Interactive API documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Update if deploying
      },
    ],
    paths: {},
  },
  apis: ['./src/routes/*.ts'], // Adjust path to your route files
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);

