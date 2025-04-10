import { Request, Response } from 'express';
import { errorResponse } from '../utils/errorUtils';

const translateControllerFunction = (req: Request, res: Response) => {
  const { text, targetLanguage } = req.body;

  if (!text || !targetLanguage) {
    return errorResponse(res, 400, 'Bad Request', 'Missing required fields');
  }

  const translatedText = `Translated (${targetLanguage}): ${text}`;

  return res.status(200).json({ translatedText });
};

export default translateControllerFunction;
