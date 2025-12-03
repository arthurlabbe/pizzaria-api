"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserController = void 0;
const AuthUserService_1 = require("../../services/user/AuthUserService");
class AuthUserController {
    async handle(req, res) {
        const { email, password } = req.body;
        const service = new AuthUserService_1.AuthUserService();
        const result = await service.execute({ email, password });
        const isDev = process.env.NODE_ENV !== "production";
        const maxAge = 60 * 60 * 24 * 30; // 30 dias
        res.cookie("session", result.token, {
            httpOnly: true,
            secure: !isDev,
            sameSite: "none",
            path: "/",
            maxAge: maxAge * 1000,
        });
        return res.json(result);
    }
}
exports.AuthUserController = AuthUserController;
