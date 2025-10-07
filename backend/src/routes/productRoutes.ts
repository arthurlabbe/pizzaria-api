import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/multer";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { CreateProductController } from "../controllers/product/CreateProductController";
import { ListByCategoryController } from "../controllers/product/ListByCategoryController";

const router = Router();
const upload = multer(uploadConfig.upload("/tmp"));

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
router.post("/product", isAuthenticated, upload.single("file"), new CreateProductController().handle);

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
router.get("/category/product", isAuthenticated, new ListByCategoryController().handle);

export default router;
