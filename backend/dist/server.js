"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const env_1 = __importDefault(require("./config/env"));
const server = app_1.default.listen(env_1.default.PORT, () => {
    console.log("Server started on port " + env_1.default.PORT);
    (0, db_1.connectDB)();
});
