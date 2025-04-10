import { tokenRequired } from '../middleware/authMiddleware';
import express, { Request, Response, NextFunction } from 'express';
import authRoutes from './authRoutes';  // Default import (if exported that way)
import userRoutes from './userRoutes';  // Default import

const router = express.Router();

// Define your translate routes here
router.get('/', (req: Request, res: Response) => {
  // Your route handler
});

export default router;  // Or export const translateRoutes = router;