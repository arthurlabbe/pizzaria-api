// src/@types/express/index.d.ts 

declare global {
  namespace Express {
    interface Request {
      user_id: string;
    }
  }
}

// torna o arquivo um módulo e evita conflitos de escopo
export {};
