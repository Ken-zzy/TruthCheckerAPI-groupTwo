import axios from 'axios';
import { Request } from 'express';
import { errorResponse } from '../utils/errorUtils';
import dotenv from 'dotenv';
import { Response } from 'express';

dotenv.config();

interface FactCheckRequestBody {
  query: string;
}

export const factCheck = async (
  req: Request<any, any, FactCheckRequestBody>,
  res: Response
) => {
  const { query } = req.body;

  if (!query) {
    return errorResponse(res, 400, 'Bad Request', 'Missing query');
  }

  try {
    const response = await axios.get('https://factchecktools.googleapis.com/v1alpha1/claims:search', {
      params: {
        query,
        key: process.env.GOOGLE_FACTCHECK_API_KEY,
      },
    });

    const claims = response.data.claims || [];

    return res.status(200).json({
      success: true,
      message: claims.length ? 'Claims found' : 'No claims found',
      data: claims,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      return errorResponse(res, 500, 'Axios Error', error.message);
    } else if (error instanceof Error) {
      console.error('General Error:', error.message);
      return errorResponse(res, 500, 'Error', error.message);
    } else {
      console.error('Unknown Error:', error);
      return errorResponse(res, 500, 'Error', 'An unknown error occurred');
    }
  }
};
