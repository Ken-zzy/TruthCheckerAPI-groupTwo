import { Request, Response } from 'express';
import { errorResponse } from '../utils/errorUtils';
import { FactCheck, Source } from '../types/factCheck';

// Conceptual "database"
const fact_checks: FactCheck[] = [];

const createFactCheck = (req: Request, res: Response) => {
    if (req.user?.userType !== 'FactChecker' && req.user?.userType !== 'Organization') {
        return errorResponse(res, 403, "Forbidden", "Insufficient permissions");
    }

    const { linkedClaim, factCheckedBy, result, fullReport, language, sources } = req.body;
    if (!linkedClaim || !factCheckedBy || !result || !fullReport || !language || !sources) {
        return errorResponse(res, 400, "Bad Request", "Missing required fact-check fields");
    }

    const newFactCheck: FactCheck = {
        id: fact_checks.length + 1,
        linkedClaim: linkedClaim,
        factCheckedBy: factCheckedBy,
        result: result,
        fullReport: fullReport,
        language: language,
        sources: sources,
        createdAt: new Date().toISOString()
    };
    fact_checks.push(newFactCheck);
    res.status(201).json(newFactCheck);
};

const getFactChecks = (req: Request, res: Response) => {
    const { query, language, page, result, category } = req.query;

    let filteredFactChecks: FactCheck[] = [...fact_checks];

    if (query) {
        filteredFactChecks = filteredFactChecks.filter(fc => fc.fullReport.toLowerCase().includes(query.toLowerCase()));
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
        const pageNumber = parseInt(page as string); //  Type assertion, be careful!
        const pageSize = 10;
        const start = (pageNumber - 1) * pageSize;
        const end = start + pageSize;
        filteredFactChecks = filteredFactChecks.slice(start, end);
    }

    res.json(filteredFactChecks);
};

const getFactCheck = (req: Request, res: Response) => {
    const factCheckId = parseInt(req.params.id);
    const factCheck = fact_checks.find(fc => fc.id === factCheckId);
    if (!factCheck) {
        return errorResponse(res, 404, "Not Found", "Fact-check report not found");
    }
    res.json(factCheck);
};

export default {
    createFactCheck,
    getFactChecks,
    getFactCheck
};