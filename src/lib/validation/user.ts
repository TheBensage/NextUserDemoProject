import { z } from "zod";

export const userSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  age: z.number().int().min(18, "Age is required and must be 18+"),
  country: z.string().nonempty("Country is required"),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
});

export type UserInput = z.infer<typeof userSchema>;
