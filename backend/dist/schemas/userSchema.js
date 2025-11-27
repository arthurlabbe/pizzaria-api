"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    email: zod_1.z.email("E-mail inválido"),
    password: zod_1.z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});
exports.authUserSchema = zod_1.z.object({
    email: zod_1.z.email("E-mail inválido"),
    password: zod_1.z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});
