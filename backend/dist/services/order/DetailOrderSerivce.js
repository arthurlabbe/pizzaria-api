"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailOrderSerivce = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DetailOrderSerivce {
    async execute({ order_id }) {
        const orders = await prisma_1.default.item.findMany({
            where: {
                order_id: order_id
            },
            include: {
                product: true,
                order: true,
            }
        });
        return orders;
    }
}
exports.DetailOrderSerivce = DetailOrderSerivce;
