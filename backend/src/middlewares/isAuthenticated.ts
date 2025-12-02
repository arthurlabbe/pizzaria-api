import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token: string | undefined;

  const authHeader = req.headers.authorization;
  if (authHeader) {
    const [, extracted] = authHeader.split(" ");
    token = extracted;
  }

  if (!token && req.cookies?.session) {
    token = req.cookies.session;
  }

  if (!token) {
    return res.status(401).json({ error: "Token não encontrado" });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET) as Payload;

    req.user_id = decoded.sub;

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}