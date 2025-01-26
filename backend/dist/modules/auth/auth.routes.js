"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const zodValidate_1 = __importDefault(require("../../utils/zodValidate"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const isAuthenticated_1 = require("../../middlewares/isAuthenticated");
const router = express_1.default.Router();
router.post("/register", (0, zodValidate_1.default)(auth_validation_1.authValidation), auth_controller_1.register);
router.post("/login", (0, zodValidate_1.default)(auth_validation_1.loginValidation), auth_controller_1.login);
router.get("/activate-account", (0, zodValidate_1.default)(auth_validation_1.activateEmailValidation), auth_controller_1.activateEmail);
router.patch("/update-password", (0, zodValidate_1.default)(auth_validation_1.updatePasswordValidation), auth_controller_1.updatePassword);
router.patch("/confirm-email", isAuthenticated_1.isAuthenticated, (0, zodValidate_1.default)(auth_validation_1.confirmEmailValidation), auth_controller_1.confirmEmail);
exports.authRouter = router;
