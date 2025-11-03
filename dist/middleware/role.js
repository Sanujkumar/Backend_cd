"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
const requireRole = (requiredRole) => {
    return (req, res, next) => {
        try {
            if (!req.role) {
                return res.status(401).json({ success: false, error: "Not authenticated" });
            }
            if (req.role !== requiredRole) {
                return res.status(403).json({ success: false, error: "Forbidden: insufficient permissions" });
            }
            next();
        }
        catch (err) {
            console.error("requireRole error:", err);
            res.status(500).json({ success: false, error: "Internal server error" });
        }
    };
};
exports.requireRole = requireRole;
//# sourceMappingURL=role.js.map