import express from 'express';
import organizationController from '../controllers/organizationController';
import { tokenRequired } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', organizationController.getOrganizations);