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
exports.verifyRefreshToken = exports.generateRefreshToken = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../../config/env"));
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, env_1.default.JWT_SECRET, {
        expiresIn: `${Number(env_1.default.JWT_EXPIRES_IN)}d`,
    });
};
exports.generateToken = generateToken;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield jsonwebtoken_1.default.verify(token, env_1.default.JWT_SECRET);
});
exports.verifyToken = verifyToken;
const generateRefreshToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, env_1.default.JWT_REFRESH_SECRET, {
        expiresIn: `${Number(env_1.default.JWT_REFRESH_EXPIRES_IN)}d`,
    });
};
exports.generateRefreshToken = generateRefreshToken;
const verifyRefreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield jsonwebtoken_1.default.verify(token, env_1.default.JWT_REFRESH_SECRET);
});
exports.verifyRefreshToken = verifyRefreshToken;
