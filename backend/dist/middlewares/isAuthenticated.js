"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const [, extracted] = authHeader.split(" ");
        token = extracted;
    }
    if (!token && req.cookies?.session) {
        token = req.cookies.session;
    }
    if (!token) {
        return res.status(401).json({ error: "Token não encontrado" });
    }
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        req.user_id = decoded.sub;
        return next();
    }
    catch (err) {
        return res.status(401).json({ error: "Token inválido" });
    }
}
