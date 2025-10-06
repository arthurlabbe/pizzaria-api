import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

export class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;
    const service = new CreateCategoryService();
    const category = await service.execute({ name });
    return res.json(category);
  }
}
