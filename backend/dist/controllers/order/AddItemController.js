"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddItemController = void 0;
const AddItemService_1 = require("../../services/order/AddItemService");
class AddItemController {
    async handle(req, res) {
        const { order_id, product_id, amount } = req.body; // validado
        const service = new AddItemService_1.AddItemService();
        const item = await service.execute({ order_id, product_id, amount });
        return res.json(item);
    }
}
exports.AddItemController = AddItemController;
