export class AppError extends Error {
   public readonly statusCode: number;
   public readonly isOperational: boolean;

   constructor(message: string, statusCode = 500, isOperational = true) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      Object.setPrototypeOf(this, new.target.prototype);
   }
}

export interface ApiResponse<T = unknown> {
   success: boolean;
   message: string;
   data?: T;
   error?: string;
}
