import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";

export const isAuthorized = (
  ...roles: string[]
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role) || "")
      return next(
        new ApiError(`Your role is not authorized to access this route`, 403)
      );
    next();
  };
};
