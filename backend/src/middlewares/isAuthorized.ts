import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";
import { IUserRequset } from "../interfaces/userRequest";

export const isAuthorized = (
  ...roles: string[]
): ((req: IUserRequset, res: Response, next: NextFunction) => void) => {
  return (req: IUserRequset, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role as string) || "")
      return next(
        new ApiError(`Your role is not authorized to access this route`, 403)
      );
    next();
  };
};
