import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";
import { ApiResponse, AppError } from "../types/shared.js";

export function handleError(
   err: Error,
   req: Request,
   res: Response,
   _next: NextFunction,
) {
   const statusCode = err instanceof AppError ? err.statusCode : 500;
   const isOperational = err instanceof AppError ? err.isOperational : false;

   if (!isOperational) {
      logger.error("Unexpected error", { message: err.message, stack: err.stack });
   } else {
      logger.warn("Operational error", { message: err.message, statusCode });
   }

   const response: ApiResponse = {
      success: false,
      message: isOperational ? err.message : "An unexpected error occurred",
      ...(process.env.NODE_ENV !== "production" && { error: err.stack }),
   };

   res.status(statusCode).json(response);
}

export function handleNotFound(req: Request, _res: Response, next: NextFunction): void {
   next(new AppError(`Route not found: ${req.method} ${req.path}`, 404));
}
