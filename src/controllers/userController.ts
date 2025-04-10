import { Request, Response } from 'express';
import { errorResponse } from '../utils/errorUtils';
import { User } from '../types/user';

// Conceptual "database"
const users: User[] = [];

const getUser = (req: Request, res: Response) => {
    if (req.user?.userType !== 'Admin') { //  Optional chaining because req.user might be undefined
        return errorResponse(res, 403, "Forbidden", "Admin access required");
    }

    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (!user) {
        return errorResponse(res, 404, "Not Found", "User not found");
    }

    res.json(user);
};

export default {
    getUser
};