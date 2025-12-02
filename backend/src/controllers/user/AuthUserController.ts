import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

export class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;
    const service = new AuthUserService();

    const result = await service.execute({ email, password });

    const isMobile = req.headers["x-mobile-app"] === "true";

    const isDev = process.env.NODE_ENV !== "production";
    const maxAge = 60 * 60 * 24 * 30; // 30 dias
    
    if (!isMobile) {
      res.cookie("session", result.token, {
        httpOnly: true,
        secure: !isDev,
        sameSite: isDev ? "lax" : "none",
        path: "/",
        maxAge: maxAge * 1000,
      });

      return res.json({ ok: true });
    }

    return res.json(result);
  }
}