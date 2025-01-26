import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { authService } from "./auth.service";
import ApiError from "../../utils/ApiError";

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await authService.register(req.body);
    if (!user)
      return next(new ApiError("Error while creating an account", 415));
    res.status(201).json({
      status: "Success",
      message: "Please review your email to activate your account",
    });
  }
);
