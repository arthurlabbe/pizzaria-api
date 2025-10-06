import { z } from "zod";

export const createOrderSchema = z.object({
  table: z.string().min(1, "Número da mesa é obrigatório"),
});

export const addItemSchema = z.object({
  order_id: z.uuid("ID de pedido inválido"),
  product_id: z.uuid("ID de produto inválido"),
  amount: z.number().min(1, "Quantidade mínima é 1"),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type AddItemInput = z.infer<typeof addItemSchema>;
