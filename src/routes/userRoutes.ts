import express from 'express';
import userController from '../controllers/userController';
import { tokenRequired } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/:id', tokenRequired, userController.getUser);

export default router;