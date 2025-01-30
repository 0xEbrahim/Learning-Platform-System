import { z } from "zod";

export const getUserByIdValidation = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const updateInfoValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email("Please provide a valid email"),
  }),
});
