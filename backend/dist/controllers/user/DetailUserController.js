"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailUserController = void 0;
const DetailUserService_1 = require("../../services/user/DetailUserService");
class DetailUserController {
    async handle(req, res) {
        const service = new DetailUserService_1.DetailUserService();
        const result = await service.execute(req.user_id);
        return res.json(result);
    }
}
exports.DetailUserController = DetailUserController;
