import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { db } from './db';
import { User } from '../src/types';

const JWT_SECRET = process.env.JWT_SECRET || 'nagrikai_karnataka_jwt_super_secret_key_2026';

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function signToken(user: User): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      preferredLanguage: user.preferredLanguage,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access token required. Please sign in.' });
    return;
  }

  const decoded = verifyToken(token);
  if (!decoded || !decoded.id) {
    res.status(403).json({ error: 'Session expired or invalid token. Please log in again.' });
    return;
  }

  const user = db.getUserById(decoded.id);
  if (!user) {
    res.status(403).json({ error: 'User account not found.' });
    return;
  }

  req.user = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    preferredLanguage: user.preferredLanguage,
    createdAt: user.createdAt,
  };

  next();
}
