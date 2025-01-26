import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { authService } from "./auth.service";
import ApiError from "../../utils/ApiError";
import { IActivationBody } from "../../@types/body";
import { IResponse } from "../../@types/response";

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await authService.register(req.body);
    if (!user)
      return next(new ApiError("Error while creating an account", 415));
    res.status(201).json({
      status: "Success",
      message: "Please review your email to activate your account",
    });
  }
);

export const activateEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const result: IResponse = await authService.activateEmail(req.body);
    res.status(result.statusCode).json({
      status: result.status,
      message: result.message,
    });
  }
);

export const confirmEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await authService.confirmEmail(req.body);
    if (!user) return next(new ApiError("Email is not exist.", 404));
    res.status(200).json({
      status: "Success",
      message: "Please review your email to activate your account",
    });
  }
);
