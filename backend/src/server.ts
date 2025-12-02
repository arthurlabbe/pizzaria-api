import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import path from "path";
import { setupSwagger } from "./config/swagger";
import router from "./routes";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "https://pizzaria-frontend-three.vercel.app",
  "http://localhost:3000",
  "http://localhost:8081",
  "http://localhost:19006",
  "http://localhost:19000",
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-mobile-app"],
  exposedHeaders: ["Set-Cookie"],
};

app.use(cors(corsOptions));

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

setupSwagger(app);


app.use(router);


app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Erro:", err.message);

  if (err instanceof Error) {
    return res.status(400).json({ error: err.message });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error.",
  });
});
//app.listen(process.env.PORT, () => console.log('Servidor online!!!'))
export default app;