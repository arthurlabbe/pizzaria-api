import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "O nome do produto é obrigatório"),
  description: z.string().optional(),
  price: z.number().min(0, "O preço deve ser maior ou igual a 0"),
  category_id: z.uuid("ID de categoria inválido"),
  image: z.string().optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
