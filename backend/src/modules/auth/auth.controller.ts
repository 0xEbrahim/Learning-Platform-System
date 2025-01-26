import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { authService } from "./auth.service";
import ApiError from "../../utils/ApiError";
import config from "../../config/env";
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

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await authService.login(req.body);
    if (!data) return next(new ApiError("Wrong email or password", 401));
    res.cookie("jwt", data.refreshToken, {
      expires: new Date(
        Date.now() + Number(config.JWT_REFRESH_EXPIRES_IN) * 24 * 60 * 60 * 1000
      ),
      secure: config.NODE_ENV === "production",
      httpOnly: true,
    });
    res.status(data.statusCode).json({
      status: data.status,
      message: data.message,
      data: data.data,
      token: data.token,
    });
  }
);

export const updatePassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    req.body.user = req.user;
    const data = await authService.updatePassword(req.body);
    res.status(data.statusCode).json({
      status: data.status,
      message: data.message,
    });
  }
);
