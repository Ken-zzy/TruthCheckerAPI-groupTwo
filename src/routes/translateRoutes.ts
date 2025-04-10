import express from 'express';
import translateControllerFunction from '../controllers/translateController';

const router = express.Router();

router.post('/', translateControllerFunction);

export default router;
