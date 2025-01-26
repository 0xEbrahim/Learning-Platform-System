"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = __importDefault(require("./env"));
const connectDB = () => mongoose_1.default
    .connect(env_1.default.DB_URI)
    .then(() => console.log("DB connected successfully"));
exports.connectDB = connectDB;
