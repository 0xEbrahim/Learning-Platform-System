"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_validation_error_1 = require("zod-validation-error");
const ApiError_1 = __importDefault(require("./ApiError"));
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        next();
    }
    catch (err) {
        const error = (0, zod_validation_error_1.fromError)(err);
        next(new ApiError_1.default(error.toString(), 400));
    }
};
exports.default = validate;
