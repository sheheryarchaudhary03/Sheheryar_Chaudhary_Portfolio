import { z } from "zod";

export const projectTypes = [
  "Brand identity",
  "UI/UX design",
  "Marketing & social",
  "Packaging & print",
  "Something else",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80, "That name is a little long."),
  email: z.string().trim().email("Please enter a valid email address.").max(160),
  company: z.string().trim().max(120).optional().default(""),
  projectType: z.enum(projectTypes, { message: "Choose what you need help with." }),
  message: z
    .string()
    .trim()
    .min(20, "Tell me a little more — at least 20 characters.")
    .max(4000, "Please keep it under 4,000 characters."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<ContactField, string>>;
  /** Echoed back so fields survive React's automatic form reset on error. */
  fields?: Partial<Record<ContactField, string>>;
};
