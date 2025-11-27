"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailOrderController = void 0;
const DetailOrderSerivce_1 = require("../../services/order/DetailOrderSerivce");
class DetailOrderController {
    async handle(req, res) {
        const order_id = req.query.order_id;
        const detailOrderService = new DetailOrderSerivce_1.DetailOrderSerivce();
        const orders = await detailOrderService.execute({
            order_id
        });
        return res.json(orders);
    }
}
exports.DetailOrderController = DetailOrderController;
