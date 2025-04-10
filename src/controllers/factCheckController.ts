import axios, { AxiosError } from 'axios';
import { Request, Response } from 'express';
import { errorResponse } from '../utils/errorUtils';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

interface FactCheckRequestBody {
  query: string;
}

export const factCheck = async (
  req: Request<{}, {}, FactCheckRequestBody>,
  res: Response
) => {
  const { query } = req.body;

  if (!query) {
    return errorResponse(res, 400, 'Bad Request', 'Missing query');
  }

  try {
    const response = await axios.get(
      `https://factchecktools.googleapis.com/v1alpha1/claims:search`,
      {
        params: {
          query,
          key: process.env.GOOGLE_FACTCHECK_API_KEY,
        },
      }
    );

    return res.status(200).json({
      success: true,
      data: response.data.claims || [],
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      return errorResponse(res, 500, 'Internal Server Error', error.message);
    }

    console.error('Unexpected error:', error);
    return errorResponse(res, 500, 'Internal Server Error', 'Something went wrong');
  }
};
