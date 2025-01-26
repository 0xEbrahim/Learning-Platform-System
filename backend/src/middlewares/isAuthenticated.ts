import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";
import { IDecodedPayload } from "../@types/token";
import { verifyToken } from "../utils/JWT/tokens";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../modules/users/user.model";
import { Document } from "mongoose";
import { IUser } from "../modules/users/user.interface";
import { Token } from "../utils/JWT/token.model";

export const isAuthenticated = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    )
      return next(new ApiError("Invalid token, please try again later", 400));
    token = req.headers.authorization.split(" ")[1];
    const blackListed = await Token.findOne({
      token: token,
    });
    if (blackListed)
      return next(
        new ApiError("Invalid token, please login and try again", 401)
      );
    const decoded: IDecodedPayload = await verifyToken(token);
    const user: (Document & IUser) | null = await User.findById(decoded.id);
    if (!user)
      return next(
        new ApiError(
          "Cannot reach the current user, the token maybe inavlid or expired",
          400
        )
      );
    req.user = user;
    next();
  }
);
