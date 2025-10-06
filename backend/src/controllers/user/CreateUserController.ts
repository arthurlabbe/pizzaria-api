import { Request, Response } from "express";
import { createUserSchema } from "../../schemas/userSchema";
import { CreateUserService } from "../../services/user/CreateUserService";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const parsed = createUserSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.format() });
    }
    const userService = new CreateUserService();
    const user = await userService.execute(parsed.data);
    return res.json(user);
  }
}
