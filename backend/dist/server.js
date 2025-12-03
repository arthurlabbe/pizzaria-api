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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.set("trust proxy", 1);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const allowedOrigins = [
    "https://pizzaria-frontend-three.vercel.app",
    "http://localhost:3000",
    "http://localhost:8081",
    "http://localhost:19006",
    "http://localhost:19000",
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin))
            return callback(null, true);
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-mobile-app"],
    exposedHeaders: ["Set-Cookie"],
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
(0, swagger_1.setupSwagger)(app);
app.use(routes_1.default);
app.use("/files", express_1.default.static(path_1.default.resolve(__dirname, "..", "tmp")));
app.use((err, req, res, next) => {
    console.error("Erro:", err.message);
    if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({
        status: "error",
        message: "Internal server error.",
    });
});
//app.listen(process.env.PORT, () => console.log('Servidor online!!!'))
exports.default = app;
