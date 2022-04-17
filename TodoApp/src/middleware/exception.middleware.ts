import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export interface ErrorModel {
  status: number;
  message: any;
}

export class ErrorException extends Error {
  status: number = 500;
  message: any = null;

  constructor({ status, message }: ErrorModel) {
    super(message);
    Object.setPrototypeOf(this, ErrorException.prototype);
    this.status = status;
    this.message = message;
  }
}

export const errorHandler = (
  err: ErrorException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status, message } = err;
  res.status(status).json([{ status, message }]);
};

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next({ status: 400, message: errors.array() } as ErrorModel);
  } else {
    next();
  }
};

export const throwError = (status: number, message: string): ErrorException => {
  return new ErrorException({
    status,
    message,
  } as ErrorModel);
};
