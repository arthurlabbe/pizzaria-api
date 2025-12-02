"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateUserController_1 = require("../controllers/user/CreateUserController");
const AuthUserController_1 = require("../controllers/user/AuthUserController");
const DetailUserController_1 = require("../controllers/user/DetailUserController");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos ou e-mail já cadastrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/users", new CreateUserController_1.CreateUserController().handle);
/**
 * @openapi
 * /session:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Usuário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso
 *       400:
 *         description: Credenciais inválidas
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/session", new AuthUserController_1.AuthUserController().handle);
/**
 * @openapi
 * /me:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário retornados
 *       401:
 *         description: Token ausente ou inválido
 *       500:
 *         description: Erro interno
 */
router.get("/me", isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
exports.default = router;
