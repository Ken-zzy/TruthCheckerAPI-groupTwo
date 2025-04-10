import { Request, Response } from 'express';
import { errorResponse } from '../utils/errorUtils';
import { Claim } from '../types/claim';

// Conceptual "database"
const claims: Claim[] = [];

const createClaim = (req: Request, res: Response) => {
    const { submittedBy, title, description, category, language } = req.body;
    if (!submittedBy || !title || !description || !category || !language) {
        return errorResponse(res, 400, "Bad Request", "Missing required claim fields");
    }

    const newClaim: Claim = {
        id: claims.length + 1,
        submittedBy: submittedBy,
        title: title,
        description: description,
        category: category,
        language: language,
        status: "Submitted",
        createdAt: new Date().toISOString()
    };
    claims.push(newClaim);
    res.status(201).json({ id: newClaim.id });
};

const getClaims = (req: Request, res: Response) => {
    const { status, category, language } = req.query;

    let filteredClaims: Claim[] = [...claims];

    if (status) {
        filteredClaims = filteredClaims.filter(claim => claim.status === status);
    }
    if (category) {
        filteredClaims = filteredClaims.filter(claim => claim.category === category);
    }
    if (language) {
        filteredClaims = filteredClaims.filter(claim => claim.language === language);
    }

    res.json(filteredClaims);
};

const getClaim = (req: Request, res: Response) => {
    const claimId = parseInt(req.params.id);
    const claim = claims.find(claim => claim.id === claimId);
    if (!claim) {
        return errorResponse(res, 404, "Not Found", "Claim not found");
    }
    res.json(claim);
};

const updateClaim = (req: Request, res: Response) => {
    const claimId = parseInt(req.params.id);
    const claim = claims.find(claim => claim.id === claimId);
    if (!claim) {
        return errorResponse(res, 404, "Not Found", "Claim not found");
    }

    const { status, comments } = req.body;
    if (!status || !comments) {
        return errorResponse(res, 400, "Bad Request", "Missing update fields");
    }

    claim.status = status;
    claim.comments = comments;
    res.json(claim);
};

export default {
    createClaim,
    getClaims,
    getClaim,
    updateClaim
};