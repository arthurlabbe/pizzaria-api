import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

export class DetailUserController {
  async handle(req: Request, res: Response) {
    const service = new DetailUserService();

    const result = await service.execute(req.user_id);

    return res.json(result);
  }
}