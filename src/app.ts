import express, { Request, Response, NextFunction } from 'express';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import organizationRoutes from './routes/organizationRoutes';
import claimRoutes from './routes/claimRoutes';
import factCheckRoutes from './routes/factCheckRoutes';
import sourceRoutes from './routes/sourceRoutes';
import { errorResponse } from './utils/errorUtils';
import morgan from 'morgan'; // For more robust logging

const app = express();

// Middleware
app.use(express.json());

// Enhanced logging with Morgan (for development)
app.use(morgan('dev')); // 'dev' format for development; use 'combined' in production

// Root route
app.get('/', (req: Request, res: Response) => {
    res.send('API is running');
});

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/organizations', organizationRoutes);
app.use('/claims', claimRoutes);
app.use('/fact-checks', factCheckRoutes);
app.use('/sources', sourceRoutes);

// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handler with better type safety
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        console.error('Error:', err.message);
        console.error(err.stack);
        errorResponse(res, 500, 'Internal Server Error', err.message);
    } else {
        console.error('Unknown error occurred:', err);
        errorResponse(res, 500, 'Internal Server Error', 'An unknown error occurred');
    }
});

export default app;