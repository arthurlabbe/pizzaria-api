"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthUserService {
    async execute({ email, password }) {
        //Verificar se o email existe.
        const user = await prisma_1.default.user.findFirst({
            where: {
                email: email
            }
        });
        if (!user) {
            throw new Error("Usuário/Senha incorreta");
        }
        const passwordMatch = await (0, bcryptjs_1.compare)(password, user.password);
        if (!passwordMatch) {
            throw new Error("Usuário/Senha incorreta");
        }
        // Se deu tudo certo vamos gerar o token pro usuario.
        const token = (0, jsonwebtoken_1.sign)({
            name: user.name,
            email: user.email
        }, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: '30d'
        });
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        };
    }
}
exports.AuthUserService = AuthUserService;
