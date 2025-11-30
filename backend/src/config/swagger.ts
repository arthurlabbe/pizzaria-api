import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API da Pizzaria",
      version: "1.0.0",
      description:
        "Documentação da API da Pizzaria. Inclui endpoints para autenticação, categorias, produtos e pedidos.",
    },
    servers: [
      {
        url: "https://pizzaria-api-eight.vercel.app",
        description: "Servidor Deployado"
      },
      {
        url: "http://localhost:3333",
        description: "Servidor de desenvolvimento",
      },
      
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

