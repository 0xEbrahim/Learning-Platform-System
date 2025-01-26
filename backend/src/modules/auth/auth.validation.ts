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
