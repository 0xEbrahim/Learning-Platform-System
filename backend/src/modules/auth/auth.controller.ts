import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { authService } from "./auth.service";
import ApiError from "../../utils/ApiError";
import config from "../../config/env";
import { IResponse } from "../../types/response";
import { IUserRequset } from "../../interfaces/userRequest";
import { IConfirmTwoStepAuth } from "../../types/body";
import { blackListToken } from "../../utils/JWT/tokens";
import sendResponse from "../../utils/sendResponse";

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
    const data: IResponse = await authService.activateEmail(req.params.token);
    sendResponse(res, data);
  }
);

export const confirmEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await authService.confirmEmail(req.body, res);
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
    if (data.message === "Logged-in successfully") {
      res.cookie("jwt", data.refreshToken, {
        expires: new Date(
          Date.now() +
            Number(config.JWT_REFRESH_EXPIRES_IN) * 24 * 60 * 60 * 1000
        ),
        secure: config.NODE_ENV === "production",
        httpOnly: true,
      });
    }
    sendResponse(res, data);
  }
);

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await authService.forgotPassword({ email: req.body.email });
    sendResponse(res, data);
  }
);

export const twoFA = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await authService.twoFA({ otp: req.body.otp });
    if (data.message === "Logged-In successfully") {
      res.cookie("jwt", data.refreshToken, {
        expires: new Date(
          Date.now() +
            Number(config.JWT_REFRESH_EXPIRES_IN) * 24 * 60 * 60 * 1000
        ),
        secure: config.NODE_ENV === "production",
        httpOnly: true,
      });
    }
    sendResponse(res, data);
  }
);

export const updatePassword = asyncHandler(
  async (req: IUserRequset, res: Response, next: NextFunction) => {
    req.body.user = req.user;
    const data = await authService.updatePassword(req.body);
    await blackListToken(req, res, next);
    sendResponse(res, data);
  }
);

export const activateTwoStepAuth = asyncHandler(
  async (req: IUserRequset, res: Response, next: NextFunction) => {
    const data = await authService.activateTwoStepAuth(req.user as any);
    sendResponse(res, data);
  }
);

export const confirmTwoStepAuth = asyncHandler(
  async (req: IUserRequset, res: Response, next: NextFunction) => {
    const body: IConfirmTwoStepAuth = {
      user: req.user as any,
      otp: req.body.otp,
    };
    const data = await authService.confirmTwoStepAuth(body);
    sendResponse(res, data);
  }
);

export const logout = asyncHandler(
  async (req: IUserRequset, res: Response, next: NextFunction) => {
    await blackListToken(req, res, next);
    res.status(200).json({
      status: "Success",
      message: "you logged-out successfully",
    });
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await authService.resetPassword({
      token: req.query.token as any,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });
    sendResponse(res, data);
  }
);

export const refresh = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await authService.refresh({ token: req.cookies.jwt });
    sendResponse(res, data);
  }
);
