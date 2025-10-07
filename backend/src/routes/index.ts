import { Router } from "express";
import userRoutes from "./userRoutes";
import categoryRoutes from "./categoryRoutes";
import productRoutes from "./productRoutes";
import orderRoutes from "./orderRoutes";

const router = Router();

router.use(userRoutes);
router.use(categoryRoutes);
router.use(productRoutes);
router.use(orderRoutes);

export default router;
