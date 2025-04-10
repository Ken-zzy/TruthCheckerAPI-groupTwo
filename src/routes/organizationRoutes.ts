import { tokenRequired } from '../middleware/authMiddleware';
import express, { Request, Response, NextFunction } from 'express';
import authRoutes from './authRoutes';  
import userRoutes from './userRoutes';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  
});

export default router;  