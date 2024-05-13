import jwt, { GetPublicKeyOrSecret, Secret } from 'jsonwebtoken';
import { AuthPayload } from '../types/authpayload.type';

export const generateToken = (payload: AuthPayload): string => {
    const secret: Secret | GetPublicKeyOrSecret = process.env.JWT_SECRET || '';
    return jwt.sign(payload, secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string): AuthPayload => {
    const secret: Secret | GetPublicKeyOrSecret = process.env.JWT_SECRET || '';
    return jwt.verify(token, secret) as unknown as AuthPayload;
};

export const decodeToken = (token: string): AuthPayload => {
    if(token.includes('Bearer')) token = token.split(' ')[1];
    return jwt.decode(token) as unknown as AuthPayload;
};
