// /lib/validations/contact.ts
import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  number: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .regex(/^[0-9+ ]+$/, "Invalid phone number"),
  topic: z.string().min(1, "Please select a topic"),
  message: z.string().min(10, "Message too short"),
});

export type ContactSchemaType = z.infer<typeof contactSchema>;
