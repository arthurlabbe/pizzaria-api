import { Router } from "express";
import multer from "multer";
import { isAuthenticated } from "../middlewares/isAuthenticated";

import { CreateOrderController } from "../controllers/order/CreateOrderController";
import { RemoveOrderController } from "../controllers/order/RemoveOrderController";
import { AddItemController } from "../controllers/order/AddItemController";
import { RemoveItemController } from "../controllers/order/RemoveItemController";
import { SendOrderController } from "../controllers/order/SendOrderController";
import { ListOrdersController } from "../controllers/order/ListOrdersController";
import { DetailOrderController } from "../controllers/order/DetailOrderController";
import { FinishOrderController } from "../controllers/order/FinishOrderController";

const router = Router();

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
router.post("/order", isAuthenticated, new CreateOrderController().handle);

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
router.delete("/order", isAuthenticated, new RemoveOrderController().handle);

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
router.post("/order/add", isAuthenticated, new AddItemController().handle);

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
router.delete("/order/remove", isAuthenticated, new RemoveItemController().handle);

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
router.put("/order/send", isAuthenticated, new SendOrderController().handle);

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
router.get("/orders", isAuthenticated, new ListOrdersController().handle);

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
router.get("/order/detail", isAuthenticated, new DetailOrderController().handle);

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
router.put("/order/finish", isAuthenticated, new FinishOrderController().handle);

export default router;
