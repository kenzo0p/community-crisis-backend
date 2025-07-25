import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { ApiError } from '../utils/ApiError';

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      const formatted = Array.isArray(error.errors) ? error.errors.map((err: any) => err.message) : [error.message || "Validation error"]
      next(new ApiError(400, 'Validation Error', formatted));
    }
  };
