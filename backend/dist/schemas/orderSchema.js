"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addItemSchema = exports.createOrderSchema = void 0;
const zod_1 = require("zod");
exports.createOrderSchema = zod_1.z.object({
    table: zod_1.z.string().min(1, "Número da mesa é obrigatório"),
});
exports.addItemSchema = zod_1.z.object({
    order_id: zod_1.z.uuid("ID de pedido inválido"),
    product_id: zod_1.z.uuid("ID de produto inválido"),
    amount: zod_1.z.number().min(1, "Quantidade mínima é 1"),
});
