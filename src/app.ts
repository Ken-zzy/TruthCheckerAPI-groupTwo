import dotenv from 'dotenv';
dotenv.config();

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerOptions, swaggerSpec } from './config/swagger';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import translateRoutes from './routes/translateRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import { organizationRoutes } from './routes/organizationRoutes';
import claimRoutes from './routes/claimRoutes';
import factCheckRoutes from './routes/factCheckRoutes';
import sourceRoutes from './routes/sourceRoutes';
import { errorResponse } from './utils/errorUtils';

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev')); // Use 'combined' format in production

// Health check route
app.get('/', (_req: Request, res: Response) => {
  res.send('API is running');
});

// Route mounting
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/organizations', organizationRoutes);
app.use('/claims', claimRoutes);
app.use('/api/fact-checks', factCheckRoutes);
app.use('/sources', sourceRoutes);
app.use('/translate', translateRoutes);

// Swagger docs route
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Central error handler
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof Error) {
    console.error('Error:', err.message);
    console.error(err.stack);
    errorResponse(res, 500, 'Internal Server Error', err.message);
  } else {
    console.error('Unknown error:', err);
    errorResponse(res, 500, 'Internal Server Error', 'An unknown error occurred');
  }
});

export default app;
