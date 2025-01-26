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
exports.isAuthenticated = void 0;
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const tokens_1 = require("../utils/JWT/tokens");
const asyncHandler_1 = require("../utils/asyncHandler");
const user_model_1 = require("../modules/users/user.model");
const token_model_1 = require("../utils/JWT/token.model");
exports.isAuthenticated = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (!req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer"))
        return next(new ApiError_1.default("Invalid token, please try again later", 400));
    token = req.headers.authorization.split(" ")[1];
    const blackListed = yield token_model_1.Token.findOne({
        token: token,
    });
    if (blackListed)
        return next(new ApiError_1.default("Invalid token, please login and try again", 401));
    const decoded = yield (0, tokens_1.verifyToken)(token);
    const user = yield user_model_1.User.findById(decoded.id);
    if (!user)
        return next(new ApiError_1.default("Cannot reach the current user, the token maybe inavlid or expired", 400));
    // req.user = user;
    next();
}));
