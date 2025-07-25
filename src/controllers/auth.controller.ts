import { AuthService } from '../services/auth.service';
import { asyncHandler } from '../utils/asyncHandler';
import { Request, Response } from 'express';
export const signup = asyncHandler(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);
  res.status(result.statusCode).json(result);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  res.status(result.statusCode).json(result);
});
