"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("../config/multer"));
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const CreateProductController_1 = require("../controllers/product/CreateProductController");
const ListByCategoryController_1 = require("../controllers/product/ListByCategoryController");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)(multer_2.default.upload("/tmp"));
/**
 * @openapi
 * /product:
 *   post:
 *     summary: Cadastra um novo produto
 *     tags: [Produto]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - category_id
 *               - file
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: string
 *               description:
 *                 type: string
 *               category_id:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Produto criado
 *       400:
 *         description: Dados inválidos ou arquivo ausente
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
//upload de imagens localmente
//router.post("/product", isAuthenticated, upload.single("file"), new CreateProductController().handle);
router.post("/product", isAuthenticated_1.isAuthenticated, new CreateProductController_1.CreateProductController().handle);
/**
 * @openapi
 * /category/product:
 *   get:
 *     summary: Lista produtos por categoria
 *     tags: [Produto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de produtos retornada
 *       400:
 *         description: Parâmetros inválidos
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/category/product", isAuthenticated_1.isAuthenticated, new ListByCategoryController_1.ListByCategoryController().handle);
exports.default = router;
