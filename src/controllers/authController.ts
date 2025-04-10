import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { errorResponse } from '../utils/errorUtils';
import config from '../config/config';
import { User } from '../types/user';

// Conceptual "database" - replace with a real database
let users: User[] = [];

function generateToken(userId: number): string {
    const payload = {
        sub: userId,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
    };
    const token = jwt.sign(payload, config.secretKey, { algorithm: 'HS256' });
    return token;
}

const register = (req: Request, res: Response) => {
    const { email, password, name, userType, preferredLanguage } = req.body;

    if (!email || !password || !name || !userType || !preferredLanguage) {
        return errorResponse(res, 400, "Bad Request", "Missing required fields");
    }

    if (users.some(user => user.email === email)) {
        return errorResponse(res, 400, "Bad Request", "The provided email is already in use.");
    }

    const newUser: User = {
        id: users.length + 1,
        name: name,
        email: email,
        password: password,
        userType: userType,
        preferredLanguage: preferredLanguage,
        organizationId: null,
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    const token = generateToken(newUser.id);
    res.status(201).json({ token: token });
};

const login = (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return errorResponse(res, 400, "Bad Request", "Missing email or password");
    }

    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return errorResponse(res, 401, "Unauthorized", "Invalid credentials");
    }

    const token = generateToken(user.id);
    res.json({ token: token });
};

export default {
    register,
    login
};