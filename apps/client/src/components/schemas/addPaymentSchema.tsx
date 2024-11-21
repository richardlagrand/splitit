"use client";

import { z } from "zod";

const addPaymentSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  description: z
    .string()
    .min(5, { message: "Description needs to be at least 5 characters" })
    .max(50, { message: "Description can't be longer than 50 characters" }),
  amount: z
    .string()
    .transform((value) => parseFloat(value))
    .refine((value) => !isNaN(value), {
      message: "Amount must be a valid number",
    })
    .refine((value) => value >= 0, {
      message: "Amount must be a positive number",
    })
    .refine((value) => /^\d+(\.\d{1,2})?$/.test(value.toString()), {
      message: "Amount must have at most 2 decimal places",
    }),
  tags: z.string().transform((value) => {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0); // Filter out any empty strings due to extra commas
  }),
});

export default addPaymentSchema;

export type RegisterFormData = z.infer<typeof addPaymentSchema>;
