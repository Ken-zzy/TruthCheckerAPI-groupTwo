import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../types/user';

// Conceptual "database" - replace with a real database
const users: User[] = [];

export const tokenRequired = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token is missing or invalid' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, config.secretKey, { algorithms: ['HS256'] }, (err, decoded: any) => {  //  Decode type is 'any' by default
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const currentUser = users.find(user => user.id === decoded.sub);
        if (!currentUser) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = currentUser;
        next();
    });
};

export default {
    tokenRequired
};