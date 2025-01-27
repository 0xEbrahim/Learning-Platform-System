import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { IDecodedPayload } from "../../types/token";
import config from "../../config/env";
import { asyncHandler } from "../asyncHandler";
import { Token } from "./token.model";

export const generateToken = (id: string): string => {
  return jwt.sign({ id }, config.JWT_SECRET as string, {
    expiresIn: `${Number(config.JWT_EXPIRES_IN)}d`,
  });
};

export const verifyToken = async (token: string): Promise<any> => {
  return await jwt.verify(token, config.JWT_SECRET as string);
};

export const generateRefreshToken = (id: string): string => {
  return jwt.sign({ id }, config.JWT_REFRESH_SECRET as string, {
    expiresIn: `${Number(config.JWT_REFRESH_EXPIRES_IN)}d`,
  });
};

export const verifyRefreshToken = async (token: string) => {
  return await jwt.verify(token, config.JWT_REFRESH_SECRET as string);
};

export const blackListToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("jwt");
    const token = req.headers.authorization?.split(" ")[1];
    const blackListed = await Token.create({ token: token });
  }
);
