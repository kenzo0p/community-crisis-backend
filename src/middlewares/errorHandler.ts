import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';

const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      data: err.data,
    });
  }

  //Fallback for unexpected errors
  return res.status(500).json({
    success: false,
    message: 'Internal server error',
    //@ts-ignore
    errors: [err.message],
    data: null,
  });
};

export { errorHandler };
