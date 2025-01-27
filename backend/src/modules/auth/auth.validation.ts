import { z } from "zod";

export const authValidation = z.object({
  body: z.object({
    name: z
      .string()
      .min(5, "Name cannot be less than 5 characters")
      .max(20, "Name cannot be more than 20 characters"),
    email: z.string().email("Invalid Email, please try another one"),
    password: z
      .string()
      .min(6, "Password cannot be less than 6 characters")
      .max(16, "Password cannot be more than 16 characters"),
    role: z.enum(["student", "teacher"] as const),
  }),
});

export const activateEmailValidation = z.object({
  body: z.object({
    token: z.string(),
  }),
});

export const confirmEmailValidation = z.object({
  body: z.object({
    email: z.string().email("Invalid Email, please try another one"),
  }),
});

export const loginValidation = z.object({
  body: z.object({
    email: z.string().email("Invalid Email, please try another one"),
    password: z.string(),
  }),
});

export const updatePasswordValidation = z.object({
  body: z
    .object({
      oldPassword: z.string(),
      password: z
        .string()
        .min(6, "Password cannot be less than 6 characters")
        .max(16, "Password cannot be more than 16 characters"),
      confirmPassword: z
        .string()
        .min(6, "Password cannot be less than 6 characters")
        .max(16, "Password cannot be more than 16 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords doesn't match",
      path: ["Password confirmation"],
    }),
});

export const confirmTwoStepAuthValidation = z.object({
  body: z.object({
    otp: z.string(),
  }),
});

export const forgotPasswordValidation = z.object({
  body: z.object({
    email: z.string(),
  }),
});

export const resetPasswordValidation = z.object({
  query: z.object({
    token: z.string(),
  }),
  body: z
    .object({
      password: z
        .string()
        .min(6, "Password cannot be less than 6 characters")
        .max(16, "Password cannot be more than 16 characters"),
      confirmPassword: z
        .string()
        .min(6, "Password cannot be less than 6 characters")
        .max(16, "Password cannot be more than 16 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords doesn't match",
      path: ["Password confirmation"],
    }),
});
