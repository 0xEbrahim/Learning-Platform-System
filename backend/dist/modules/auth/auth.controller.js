"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.login = exports.confirmEmail = exports.activateEmail = exports.register = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const auth_service_1 = require("./auth.service");
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const env_1 = __importDefault(require("../../config/env"));
exports.register = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_service_1.authService.register(req.body);
    if (!user)
        return next(new ApiError_1.default("Error while creating an account", 415));
    res.status(201).json({
        status: "Success",
        message: "Please review your email to activate your account",
    });
}));
exports.activateEmail = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authService.activateEmail(req.body);
    res.status(result.statusCode).json({
        status: result.status,
        message: result.message,
    });
}));
exports.confirmEmail = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_service_1.authService.confirmEmail(req.body);
    if (!user)
        return next(new ApiError_1.default("Email is not exist.", 404));
    res.status(200).json({
        status: "Success",
        message: "Please review your email to activate your account",
    });
}));
exports.login = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield auth_service_1.authService.login(req.body);
    if (!data)
        return next(new ApiError_1.default("Wrong email or password", 401));
    res.cookie("jwt", data.refreshToken, {
        expires: new Date(Date.now() + Number(env_1.default.JWT_REFRESH_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        secure: env_1.default.NODE_ENV === "production",
        httpOnly: true,
    });
    res.status(data.statusCode).json({
        status: data.status,
        message: data.message,
        data: data.data,
        token: data.token,
    });
}));
exports.updatePassword = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // req.body.user = req.user;
    const data = yield auth_service_1.authService.updatePassword(req.body);
    res.status(data.statusCode).json({
        status: data.status,
        message: data.message,
    });
}));
