import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

export class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;
    const service = new AuthUserService();
    
    const token = await service.execute({ email, password });

    const maxAge = 60 * 60 * 24 * 30;

    res.cookie("session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: maxAge * 1000
    });

    return res.json({ ok: true });
  }
}
