import express from 'express';
import organizationController from '../controllers/organizationController';
import { tokenRequired } from '../middleware/authMiddleware';

const router = express.Router();
export const organizationRoutes = router;

router.get('/', organizationController.getOrganizations);