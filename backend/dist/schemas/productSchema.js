"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "O nome do produto é obrigatório"),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().min(0, "O preço deve ser maior ou igual a 0"),
    category_id: zod_1.z.uuid("ID de categoria inválido"),
    image: zod_1.z.string().optional(),
});
