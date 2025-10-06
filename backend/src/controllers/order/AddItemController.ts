import { Request, Response } from "express";
import { AddItemService } from "../../services/order/AddItemService";

export class AddItemController {
  async handle(req: Request, res: Response) {
    const { order_id, product_id, amount } = req.body; // validado
    const service = new AddItemService();
    const item = await service.execute({ order_id, product_id, amount });
    return res.json(item);
  }
}
