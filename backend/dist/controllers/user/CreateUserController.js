"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const userSchema_1 = require("../../schemas/userSchema");
const CreateUserService_1 = require("../../services/user/CreateUserService");
class CreateUserController {
    async handle(req, res) {
        const parsed = userSchema_1.createUserSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.format() });
        }
        const userService = new CreateUserService_1.CreateUserService();
        const user = await userService.execute(parsed.data);
        return res.json(user);
    }
}
exports.CreateUserController = CreateUserController;
