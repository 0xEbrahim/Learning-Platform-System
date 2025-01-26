"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordValidation = exports.loginValidation = exports.confirmEmailValidation = exports.activateEmailValidation = exports.authValidation = void 0;
const zod_1 = require("zod");
exports.authValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(5, "Name cannot be less than 5 characters")
            .max(20, "Name cannot be more than 20 characters"),
        email: zod_1.z.string().email("Invalid Email, please try another one"),
        password: zod_1.z
            .string()
            .min(6, "Password cannot be less than 6 characters")
            .max(16, "Password cannot be more than 16 characters"),
        role: zod_1.z.enum(["student", "teacher"]),
    }),
});
exports.activateEmailValidation = zod_1.z.object({
    body: zod_1.z.object({
        token: zod_1.z.string(),
    }),
});
exports.confirmEmailValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Invalid Email, please try another one"),
    }),
});
exports.loginValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Invalid Email, please try another one"),
        password: zod_1.z.string(),
    }),
});
exports.updatePasswordValidation = zod_1.z.object({
    body: zod_1.z
        .object({
        oldPassword: zod_1.z.string(),
        password: zod_1.z.string()
            .min(6, "Password cannot be less than 6 characters")
            .max(16, "Password cannot be more than 16 characters"),
        confirmPassword: zod_1.z.string()
            .min(6, "Password cannot be less than 6 characters")
            .max(16, "Password cannot be more than 16 characters"),
    })
        .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords doesn't match",
        path: ["Password confirmation"],
    }),
});
