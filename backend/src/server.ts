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
  ],
  credentials: true
}));

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

app.listen(process.env.PORT, () => console.log('Servidor online!!!.'))