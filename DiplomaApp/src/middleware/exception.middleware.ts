import { NextFunction, Request, Response } from "express";

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

export const throwError = (status: number, message: string): ErrorException => {
  return new ErrorException({
    status,
    message,
  } as ErrorModel);
};
