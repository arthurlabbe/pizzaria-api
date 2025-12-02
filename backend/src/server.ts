import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import path from "path";
import { setupSwagger } from "./config/swagger";
import router from "./routes";
import fileUpload from "express-fileupload";

const app = express();
app.use(express.json());

const allowedOrigins = [
  "https://pizzaria-frontend-three.vercel.app",
  "http://localhost:3000",
  "http://localhost:3333",
  "http://localhost:8081"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  const isWeb =
    origin === "https://pizzaria-frontend-three.vercel.app" ||
    origin === "http://localhost:3000" ||
    origin === "http://localhost:3333";

  const isMobile =
    origin === "http://localhost:8081";

  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  } else {
    res.header("Access-Control-Allow-Origin", "https://pizzaria-frontend-three.vercel.app");
  }

  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");

  if (isWeb) {
    res.header("Access-Control-Allow-Credentials", "true");
  }

  if (isMobile) {
    res.header("Access-Control-Allow-Credentials", "false");
  }

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  next();
});

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
  })
);

setupSwagger(app);
app.use(router);

app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error."
  });
});

export default app;