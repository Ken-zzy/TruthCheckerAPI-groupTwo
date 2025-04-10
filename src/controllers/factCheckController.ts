import { Request, Response } from 'express';
import { errorResponse } from '../utils/errorUtils';
import { FactCheck } from '../types/factCheck';

// Mock database
const fact_checks: FactCheck[] = [];

// Create FactCheck
export const createFactCheck = (req: Request, res: Response) => {
  if (req.user?.userType !== 'FactChecker' && req.user?.userType !== 'Organization') {
    return errorResponse(res, 403, 'Forbidden: Insufficient permissions');
  }

  const { linkedClaim, factCheckedBy, result, fullReport, language, sources } = req.body;

  if (!linkedClaim || !factCheckedBy || !result || !fullReport || !language || !sources) {
    return errorResponse(res, 400, 'Bad Request: Missing required fact-check fields');
  }

  const newFactCheck: FactCheck = {
    id: fact_checks.length + 1,
    linkedClaim,
    factCheckedBy,
    result,
    fullReport,
    language,
    sources,
    createdAt: new Date().toISOString(),
  };

  fact_checks.push(newFactCheck);
  return res.status(201).json(newFactCheck);
};

// Get All FactChecks
export const getFactChecks = (req: Request, res: Response) => {
  const { query, language, page, result, category } = req.query;

  let filteredFactChecks = [...fact_checks];

  if (query) {
    filteredFactChecks = filteredFactChecks.filter(fc =>
      fc.fullReport.toLowerCase().includes((query as string).toLowerCase())
    );
  }

  if (language) {
    filteredFactChecks = filteredFactChecks.filter(fc => fc.language === language);
  }

  if (result) {
    filteredFactChecks = filteredFactChecks.filter(fc => fc.result === result);
  }

  if (category) {
    filteredFactChecks = filteredFactChecks.filter(fc => fc.category === category);
  }

  if (page) {
    const pageNumber = parseInt(page as string);
    const pageSize = 10;
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;
    filteredFactChecks = filteredFactChecks.slice(start, end);
  }

  return res.json(filteredFactChecks);
};

// Get Single FactCheck
export const getFactCheck = (req: Request, res: Response) => {
  const factCheckId = parseInt(req.params.id);

  const factCheck = fact_checks.find(fc => fc.id === factCheckId);

  if (!factCheck) {
    return errorResponse(res, 404, 'Not Found: Fact-check report not found');
  }

  return res.json(factCheck);
};
