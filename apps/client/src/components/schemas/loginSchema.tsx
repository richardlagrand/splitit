"use client";

import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default loginSchema;

export type RegisterFormData = z.infer<typeof loginSchema>;
