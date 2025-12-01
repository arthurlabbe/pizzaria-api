import express, { Request, Response, NextFunction } from 'express' 
import 'express-async-errors';
import cors from 'cors';
import path from 'path';
import { setupSwagger } from "./config/swagger";

import router from "./routes";
import fileUpload from 'express-fileupload';

const app = express();
app.use(express.json());

app.use(cors({
  origin: [
    "https://pizzaria-frontend-three.vercel.app",
    "http://localhost:3000",
    "http://localhost:3333",
    "http://localhost:8081",
    "exp://*",
    /^http:\/\/192\.168\.\d+\.\d+(:\d+)?$/
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  //res.header("Access-Control-Allow-Origin", "https://pizzaria-frontend-three.vercel.app");
  //res.header("Access-Control-Allow-Origin", "http://localhost:8081");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  return res.status(204).end();

  //if (req.method === "OPTIONS") {
    //return res.status(204).end();
  //}
  }
  next();
});

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024} //50mb
}));

setupSwagger(app);

app.use(router);

//Usado em localhost
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof Error){
    return res.status(400).json({
      error: err.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  })

})

export default app;
//app.listen(process.env.PORT, () => console.log('Servidor online!!!'))