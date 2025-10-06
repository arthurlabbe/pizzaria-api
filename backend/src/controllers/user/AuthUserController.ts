import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

export class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;
    const service = new AuthUserService();
    const token = await service.execute({ email, password });
    return res.json(token);
  }
}
