import { Request, Response } from 'express';
import { errorResponse } from '../utils/errorUtils';
import { Source } from '../types/factCheck';

// Conceptual "database"
const fact_checks: any[] = []; //  TODO:  Replace 'any' with the actual type

const getSources = (req: Request, res: Response) => {
    const { factCheckId } = req.query;
    if (!factCheckId) {
        return errorResponse(res, 400, "Bad Request", "factCheckId is required");
    }

    const relatedSources: Source[] = [];
    for (const fc of fact_checks) {
        if (fc.id === parseInt(factCheckId as string)) {  //  Type assertion
            relatedSources.push(...fc.sources);
        }
    }
    res.json(relatedSources);
};

export default {
    getSources
};