import express from 'express';
import claimRoutes from './claimRoutes';

const app = express();

app.use(express.json());

// Correct usage
app.use('/api', claimRoutes);

export default app;
