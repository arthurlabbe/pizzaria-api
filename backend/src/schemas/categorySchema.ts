import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "O nome da categoria é obrigatório/inválido"),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
