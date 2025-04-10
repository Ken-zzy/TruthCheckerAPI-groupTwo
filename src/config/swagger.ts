import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { swaggerOptions } from './swaggeroptions';
import { OpenAPIV3 } from 'openapi-types';


export const swaggerSpec: OpenAPIV3.Document<{}> = swaggerJSDoc(swaggerOptions);


/**
 * Sets up Swagger Documentation for the API
 * @param app Express Application
 */
export const swaggerDocs = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log(`Swagger Docs available at http://localhost:3000/api-docs`);
};
