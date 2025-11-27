"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const CreateOrderController_1 = require("../controllers/order/CreateOrderController");
const RemoveOrderController_1 = require("../controllers/order/RemoveOrderController");
const AddItemController_1 = require("../controllers/order/AddItemController");
const RemoveItemController_1 = require("../controllers/order/RemoveItemController");
const SendOrderController_1 = require("../controllers/order/SendOrderController");
const ListOrdersController_1 = require("../controllers/order/ListOrdersController");
const DetailOrderController_1 = require("../controllers/order/DetailOrderController");
const FinishOrderController_1 = require("../controllers/order/FinishOrderController");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /order:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Pedido]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - table
 *             properties:
 *               table:
 *                 type: number
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token ausente ou inválido
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/order", isAuthenticated_1.isAuthenticated, new CreateOrderController_1.CreateOrderController().handle);
/**
 * @openapi
 * /order:
 *   delete:
 *     summary: Remove um pedido
 *     tags: [Pedido]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: order_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pedido a ser removido
 *     responses:
 *       200:
 *         description: Pedido removido
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/order", isAuthenticated_1.isAuthenticated, new RemoveOrderController_1.RemoveOrderController().handle);
/**
 * @openapi
 * /order/add:
 *   post:
 *     summary: Adiciona um item ao pedido
 *     tags: [Pedido]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_id
 *               - product_id
 *               - amount
 *             properties:
 *               order_id:
 *                 type: string
 *               product_id:
 *                 type: string
 *               amount:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item adicionado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Pedido ou produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/order/add", isAuthenticated_1.isAuthenticated, new AddItemController_1.AddItemController().handle);
/**
 * @openapi
 * /order/remove:
 *   delete:
 *     summary: Remove um item do pedido
 *     tags: [Pedido]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: item_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do item que será removido do pedido
 *     responses:
 *       200:
 *         description: Item removido com sucesso
 *       400:
 *         description: Parâmetro inválido
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Item não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/order/remove", isAuthenticated_1.isAuthenticated, new RemoveItemController_1.RemoveItemController().handle);
/**
 * @openapi
 * /order/send:
 *   put:
 *     summary: Envia o pedido para produção
 *     tags: [Pedido]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_id
 *             properties:
 *               order_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pedido enviado com sucesso
 *       400:
 *         description: Pedido inválido
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/order/send", isAuthenticated_1.isAuthenticated, new SendOrderController_1.SendOrderController().handle);
/**
 * @openapi
 * /orders:
 *   get:
 *     summary: Lista todos os pedidos em aberto
 *     tags: [Pedido]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *       401:
 *         description: Token ausente ou inválido
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/orders", isAuthenticated_1.isAuthenticated, new ListOrdersController_1.ListOrdersController().handle);
/**
 * @openapi
 * /order/detail:
 *   get:
 *     summary: Detalha os itens de um pedido
 *     tags: [Pedido]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: order_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido a ser detalhado
 *     responses:
 *       200:
 *         description: Detalhes do pedido retornados
 *       400:
 *         description: Parâmetro inválido
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/order/detail", isAuthenticated_1.isAuthenticated, new DetailOrderController_1.DetailOrderController().handle);
/**
 * @openapi
 * /order/finish:
 *   put:
 *     summary: Finaliza um pedido
 *     tags: [Pedido]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_id
 *             properties:
 *               order_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pedido finalizado com sucesso
 *       400:
 *         description: Pedido inválido ou já finalizado
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/order/finish", isAuthenticated_1.isAuthenticated, new FinishOrderController_1.FinishOrderController().handle);
exports.default = router;
