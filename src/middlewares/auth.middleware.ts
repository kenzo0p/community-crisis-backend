import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError';
const JWT_SECRET = process.env.JWT_SECRET!;
interface JwTPayload {
  id: number;
  role: string;
}

declare module 'express' {
  export interface Request {
    user?: {
      id: number;
      role: string;
    };
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new ApiError(401, 'Authorization header missing'));
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return next(new ApiError(401, 'Token missing'));
  }
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as JwTPayload;
    req.user = decodedToken;
    next();
  } catch (error) {
    return next(new ApiError(401, 'Invalid or expired token'));
  }
};

export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ApiError(403, 'Forbidden: insufficient permission'));
    }
    next();
  };
};
