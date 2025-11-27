"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateCategoryController_1 = require("../controllers/category/CreateCategoryController");
const ListCategoryController_1 = require("../controllers/category/ListCategoryController");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /category:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoria criada
 *       400:
 *         description: Nome de categoria inválido
 *       401:
 *         description: Token ausente ou inválido
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/category", isAuthenticated_1.isAuthenticated, new CreateCategoryController_1.CreateCategoryController().handle);
/**
 * @openapi
 * /category:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias retornada
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/category", isAuthenticated_1.isAuthenticated, new ListCategoryController_1.ListCategoryController().handle);
exports.default = router;
