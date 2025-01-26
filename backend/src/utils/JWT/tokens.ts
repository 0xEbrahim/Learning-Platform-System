import jwt, { JwtPayload } from "jsonwebtoken";
import { IDecodedPayload } from "../../@types/token";
import config from "../../config/env";
export const generateToken = (id: string): string => {
  return jwt.sign({ id }, config.JWT_SECRET as string, {
    expiresIn: `${Number(config.JWT_EXPIRES_IN)}d`,
  });
};

export const verifyToken = async (token: string): Promise<any> => {
  return (await jwt.verify(token, config.JWT_SECRET as string));
};

export const generateRefreshToken = (id: string): string => {
  return jwt.sign({ id }, config.JWT_REFRESH_SECRET as string, {
    expiresIn: `${Number(config.JWT_REFRESH_EXPIRES_IN)}d`,
  });
};

export const verifyRefreshToken = async (token: string) => {
  return await jwt.verify(token, config.JWT_REFRESH_SECRET as string);
};
