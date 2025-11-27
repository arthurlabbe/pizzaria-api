"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserController = void 0;
const AuthUserService_1 = require("../../services/user/AuthUserService");
class AuthUserController {
    async handle(req, res) {
        const { email, password } = req.body;
        const service = new AuthUserService_1.AuthUserService();
        const token = await service.execute({ email, password });
        return res.json(token);
    }
}
exports.AuthUserController = AuthUserController;
