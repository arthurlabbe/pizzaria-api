"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
const categoryRoutes_1 = __importDefault(require("./categoryRoutes"));
const productRoutes_1 = __importDefault(require("./productRoutes"));
const orderRoutes_1 = __importDefault(require("./orderRoutes"));
const router = (0, express_1.Router)();
router.use(userRoutes_1.default);
router.use(categoryRoutes_1.default);
router.use(productRoutes_1.default);
router.use(orderRoutes_1.default);
exports.default = router;
