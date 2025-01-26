"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const env_1 = __importDefault(require("../config/env"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const handleDuplicateDb = (err) => {
    const values = Object.values(err.keyValue).join(", ");
    const message = `Duplicate values on fields: ${values} , please try again`;
    return new ApiError_1.default(message, 409);
};
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new ApiError_1.default(message, 403);
};
const handleCastError = (err) => {
    const message = "Resource not found. Invalid: " + err.path;
    return new ApiError_1.default(message, 404);
};
const handleExpiredJwtError = (err) => {
    return new ApiError_1.default("Expired Json web token, please try again later", 401);
};
const handleJWTError = (err) => {
    return new ApiError_1.default("Invalid Json web token, try again later", 401);
};
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "Fail";
    let error = err;
    if (err.code === 11000)
        error = handleDuplicateDb(error);
    if (err.name === "CastError")
        error = handleCastError(error);
    if (error.name === "ValidationError")
        error = handleValidationErrorDB(error);
    if (err.name === "JsonWebTokenError")
        error = handleJWTError(error);
    if (err.name === "TokenExpiredError")
        error = handleExpiredJwtError(error);
    const response = {
        success: false,
        status: error.status,
        message: error.message,
        stack: env_1.default.NODE_ENV === "production" ? undefined : error.stack,
    };
    res.status(error.statusCode).json(response);
};
exports.globalErrorHandler = globalErrorHandler;
