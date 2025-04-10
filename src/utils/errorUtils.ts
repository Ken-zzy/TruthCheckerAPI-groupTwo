import { Response } from 'express';

export const errorResponse = (
  res: Response,
  statusCode: number,
  error: string,
  message?: string
) => {
  return res.status(statusCode).json({
    error,
    message,
  });
};
