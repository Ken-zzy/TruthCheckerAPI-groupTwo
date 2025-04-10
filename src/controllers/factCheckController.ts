import { Request, Response } from 'express';

// Create Fact Check
export const createFactCheck = (req: Request, res: Response) => {
  // your logic here
  res.status(201).json({ message: 'Fact Check created successfully' });
};

// Get All Fact Checks
export const getAllFactChecks = (req: Request, res: Response) => {
  // your logic here
  res.status(200).json({ message: 'All Fact Checks' });
};

// Get Single Fact Check By Id
export const getFactCheckById = (req: Request, res: Response) => {
  const { id } = req.params;
  // your logic here
  res.status(200).json({ message: `Fact Check with id: ${id}` });
};
