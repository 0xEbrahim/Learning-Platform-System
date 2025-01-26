import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { authService } from "./auth.service";

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("SSSS")
    const user = await authService.register(req.body);
    res.status(201).json({
      user,
    });
  }
);
