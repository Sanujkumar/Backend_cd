"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET_KEY is not defined in .env");
}
const authorize = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, error: "Token is missing" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                error: "token is missing"
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (!decoded?.user) {
            return res.status(401).json({ success: false, error: "Invalid token" });
        }
        req.userId = decoded.user.id.toString();
        req.email = decoded.user.email;
        req.role = decoded.user.role;
        req.name = decoded.user.name;
        next();
    }
    catch (error) {
        console.error("authorize error:", error);
        res.status(401).json({ success: false, error: "Invalid or expired token" });
    }
};
exports.authorize = authorize;
//# sourceMappingURL=auth.js.map