"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const path_1 = __importDefault(require("path"));
const swagger_1 = require("./config/swagger");
const routes_1 = __importDefault(require("./routes"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const allowedOrigins = [
    "https://pizzaria-frontend-three.vercel.app",
    "http://localhost:3000",
    "http://localhost:3333",
    "http://localhost:8081"
];
app.use((req, res, next) => {
    const origin = req.headers.origin;
    const isWeb = origin === "https://pizzaria-frontend-three.vercel.app" ||
        origin === "http://localhost:3000" ||
        origin === "http://localhost:3333";
    const isMobile = origin === "http://localhost:8081";
    if (origin && allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    else {
        res.header("Access-Control-Allow-Origin", "https://pizzaria-frontend-three.vercel.app");
    }
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    if (isWeb) {
        res.header("Access-Control-Allow-Credentials", "true");
    }
    if (isMobile) {
        res.header("Access-Control-Allow-Credentials", "false");
    }
    if (req.method === "OPTIONS") {
        return res.status(204).end();
    }
    next();
});
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 }
}));
(0, swagger_1.setupSwagger)(app);
app.use(routes_1.default);
app.use("/files", express_1.default.static(path_1.default.resolve(__dirname, "..", "tmp")));
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({
        status: "error",
        message: "Internal server error."
    });
});
exports.default = app;
