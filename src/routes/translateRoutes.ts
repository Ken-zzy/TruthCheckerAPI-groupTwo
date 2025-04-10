import express, { Request, Response } from 'express';
import { translateText } from '../utils/translateUtils';

const router = express.Router();

/**
 * @route POST /translate
 * @body { text: string, to: string[] }
 */
router.post('/', async (req: Request, res: Response) => {
  const { text, to } = req.body;

  if (!text || !Array.isArray(to)) {
    return res.status(400).json({
      success: false,
      message: '`text` and `to` (array of language codes) are required',
    });
  }

  try {
    const results: { lang: string; translation: string }[] = [];

    for (const lang of to) {
      const translation = await translateText(text, lang);
      results.push({ lang, translation });
    }

    return res.status(200).json({
      success: true,
      original: text,
      translations: results,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Translation failed',
    });
  }
});

export default router;
