import { AppError } from "./index";
import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof AppError) {
    console.log(`Error ${req.method} ${req.url}- ${err.message}`);
    return res.status(err.statusCode).json({ 
        details: err.details,
        status: 'error',
         message: err.message, 
         ...(err.details && { details: err.details })
    });
  } else {
    console.log(`Unhandled error: ${err.message}`);

    return res.status(500).json({ message: 'Something Went Wrong Please Try Again !!' });
  }
};