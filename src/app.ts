import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import translateRoutes from './routes/translateRoutes';
import factCheckRoutes from './routes/factCheckRoutes';

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/translate', translateRoutes);
app.use('/api/fact-check', factCheckRoutes);

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root Route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to TruthChecker API',
  });
});

export default app;
