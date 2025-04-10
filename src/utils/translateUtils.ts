import axios from 'axios';

const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY || ''; // Use .env file

export async function translateText(text: string, targetLanguage: string): Promise<string> {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

  try {
    const response = await axios.post(url, {
      q: text,
      target: targetLanguage,
      format: 'text',
    });

    return response.data.data.translations[0].translatedText;
  } catch (error: any) {
    console.error('Translation error:', error?.response?.data || error.message);
    throw new Error('Translation failed');
  }
}
