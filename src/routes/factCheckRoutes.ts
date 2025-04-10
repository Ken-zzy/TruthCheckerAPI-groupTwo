import express, { Router } from 'express';
import { createFactCheck, getAllFactChecks, getFactCheckById } from '../controllers/factCheckController';

const router: Router = express.Router();

router.post('/', createFactCheck);
router.get('/', getAllFactChecks);
router.get('/:id', getFactCheckById);

export default router;
