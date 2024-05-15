import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.util';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    try {
        verifyToken(token);
        next();
    } catch (error: any) {
        console.log(error)
        if (error.name === 'TokenExpiredError') return res.status(401).json({ message: 'Token expired' });
        else return res.status(403).json({ message: 'Invalid token' });

    }
};