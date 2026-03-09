import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../types/shared.js";

export const sendMessageRules = [
   body("phone")
      .trim()
      .notEmpty()
      .withMessage("phone is required")
      .matches(/^\d{7,15}$/)
      .withMessage("phone must be 7–15 digits only"),

   body("message")
      .trim()
      .notEmpty()
      .withMessage("message is required")
      .isLength({ max: 2000 })
      .withMessage("message must not exceed 2000 characters"),
];

export function handleValidationErrors(
   req: Request,
   _res: Response,
   next: NextFunction,
): void {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      const messages = errors
         .array()
         .map((e) => e.msg)
         .join(", ");
      return next(new AppError(messages, 422));
   }
   next();
}
