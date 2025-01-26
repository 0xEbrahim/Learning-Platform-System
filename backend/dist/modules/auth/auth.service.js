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
exports.authService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const email_1 = __importDefault(require("../../config/email"));
const ActivationTemplate_1 = require("../../views/ActivationTemplate");
const user_model_1 = require("../users/user.model");
const tokens_1 = require("../../utils/JWT/tokens");
class AuthService {
    register(Payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.create(Payload);
            const token = user.generateEmailConfirmationToken();
            yield user.save();
            const link = `http://localhost:3000/api/v1/auth/activate-account/`;
            const template = (0, ActivationTemplate_1.generateActivationTemplate)(token, user.name, link);
            const data = {
                email: user.email,
                subject: "Acount activation",
                template,
            };
            yield (0, email_1.default)(data);
            return user;
        });
    }
    activateEmail(Payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = Payload;
            const encoded = crypto_1.default.createHash("sha256").update(token).digest("hex");
            const user = yield user_model_1.User.findOne({
                emailConfirmationToken: encoded,
                emailConfirmationTokenExpires: {
                    $gt: Date.now(),
                },
            });
            const result = {
                status: "Success",
                message: "Email Activated successfully, try to login now",
                statusCode: 200,
            };
            if (!user) {
                result.message =
                    "Invalid or expired email activation token, try to request another code";
                result.statusCode = 403;
                result.status = "Fail";
                return result;
            }
            user.email_confirmed = true;
            user.emailConfirmationToken = undefined;
            user.emailConfirmationTokenExpires = undefined;
            yield user.save();
            return result;
        });
    }
    confirmEmail(Payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = Payload;
            const user = yield user_model_1.User.findOne({
                email: email,
            });
            if (!user)
                return null;
            const token = user.generateEmailConfirmationToken();
            yield user.save();
            const link = `http://localhost:3000/api/v1/auth/activate-account/`;
            const template = (0, ActivationTemplate_1.generateActivationTemplate)(token, user.name, link);
            const data = {
                email: user.email,
                subject: "Acount activation",
                template,
            };
            yield (0, email_1.default)(data);
            return user;
        });
    }
    login(Payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = Payload;
            const user = yield user_model_1.User.findOne({
                email: email,
            });
            const result = {
                message: "Logged-in successfully",
                status: "Success",
                statusCode: 200,
                data: "",
                token: "",
                refreshToken: "",
            };
            if (!user || !(yield user.comparePassword(password))) {
                return null;
            }
            if (!user.email_confirmed) {
                result.message =
                    "Cannot login before confirming your email, please confirm it and try again.";
                result.status = "error";
                result.statusCode = 409;
                result.data = undefined;
                result.token = undefined;
                result.refreshToken = undefined;
                return result;
            }
            user.password = undefined;
            result.data = user;
            const token = (0, tokens_1.generateToken)(user._id);
            const refreshToken = (0, tokens_1.generateRefreshToken)(user._id);
            result.token = token;
            result.refreshToken = refreshToken;
            return result;
        });
    }
    updatePassword(Payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, oldPassword, password } = Payload;
            const result = {
                message: "Password updated successfully and you have been logged-out. please login again with the new password",
                status: "Success",
                statusCode: 200,
            };
            if (!user.comparePassword(oldPassword)) {
                result.message = "Old password is wrong, please try again";
                result.status = "Error";
                result.statusCode = 401;
                return result;
            }
            user.password = password;
            user.passwordChangedAt = new Date(Date.now());
            yield user.save();
            return result;
        });
    }
}
exports.authService = new AuthService();
