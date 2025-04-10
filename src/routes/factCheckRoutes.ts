import { Router } from 'express';
import { createFactCheck, getFactChecks, getFactCheck } from '../controllers/factCheckController';

const router = Router();

router.post('/', createFactCheck);       // Create a new fact-check
router.get('/', getFactChecks);          // Get all fact-checks (with filters)
router.get('/:id', getFactCheck);        // Get a single fact-check by ID

export default router;
