import express from 'express';
import organizationController from '../controllers/organizationController';
const router = express.Router();
import { tokenRequired } from '../middleware/authMiddleware';

export const organizationRoutes = router;

router.get('/', organizationController.getOrganizations);