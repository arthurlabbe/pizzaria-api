import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const authUserSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type AuthUserInput = z.infer<typeof authUserSchema>;