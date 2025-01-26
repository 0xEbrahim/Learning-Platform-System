import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { authService } from "./auth.service";

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await authService.register(req.body);
  }
);
