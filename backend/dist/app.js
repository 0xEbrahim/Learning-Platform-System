"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
dotenv_1.default.config();
const env_1 = __importDefault(require("./config/env"));
const auth_routes_1 = require("./modules/auth/auth.routes");
const error_1 = require("./middlewares/error");
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(env_1.default.NODE_ENV === "production" ? (0, morgan_1.default)("combined") : (0, morgan_1.default)("dev"));
app.use("/api/v1/auth", auth_routes_1.authRouter);
app.use(error_1.globalErrorHandler);
app.all("*", (req, res, next) => {
    res.status(404).json({
        success: false,
        status: "Error",
        message: "Resource not found",
    });
});
exports.default = app;
