import express from 'express';
// import your source controller here when available
// import { sourceControllerFunction } from '../controllers/sourceController';

const router = express.Router();

// Example route
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Source route working!' });
});

export default router;
