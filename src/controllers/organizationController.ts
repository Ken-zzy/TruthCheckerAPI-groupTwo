import { Request, Response } from 'express';
import { errorResponse } from '../utils/errorUtils';
import { Organization } from '../types/organization';

// Conceptual "database"
const organizations: Organization[] = [];

const getOrganizations = (req: Request, res: Response) => {
    res.json(organizations);
};

const createOrganization = (req: Request, res: Response) => {
    if (req.user?.userType !== 'Admin') {
        return errorResponse(res, 403, "Forbidden", "Admin access required");
    }

    const { name, type, contactEmail } = req.body;
    if (!name || !type || !contactEmail) {
        return errorResponse(res, 400, "Bad Request", "Missing required organization fields");
    }

    const newOrg: Organization = {
        id: organizations.length + 1,
        name: name,
        type: type,
        contactEmail: contactEmail,
        createdAt: new Date().toISOString()
    };
    organizations.push(newOrg);
    res.status(201).json(newOrg);
};

export default {
    getOrganizations,
    createOrganization
};