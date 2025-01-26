import { Request, Response, NextFunction } from "express";
import config from "../config/env";
import ApiError from "../utils/ApiError";

const handleDuplicateDb = (err: any): ApiError => {
  const values = Object.values(err.keyValue).join(", ");
  const message = `Duplicate values on fields: ${values} , please try again`;
  return new ApiError(message, 409);
};

const handleValidationErrorDB = (err: any): ApiError => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new ApiError(message, 403);
};

const handleCastError = (err: any): ApiError => {
  const message = "Resource not found. Invalid: " + err.path;
  return new ApiError(message, 404);
};

const handleExpiredJwtError = (err: any): ApiError => {
  return new ApiError("Expired Json web token, please try again later", 401);
};

const handleJWTError = (err: any): ApiError => {
  return new ApiError("Invalid Json web token, try again later", 401);
};

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Fail";
  let error = err;
  if (err.code === 11000) error = handleDuplicateDb(error);
  if (err.name === "CastError") error = handleCastError(error);
  if (error.name === "ValidationError") error = handleValidationErrorDB(error);
  if (err.name === "JsonWebTokenError") error = handleJWTError(error);
  if (err.name === "TokenExpiredError") error = handleExpiredJwtError(error);
  const response = {
    success: false,
    status: error.status,
    message: error.message,
    stack: config.NODE_ENV === "production" ? undefined : error.stack,
  };
  res.status(error.statusCode).json(response);
};
