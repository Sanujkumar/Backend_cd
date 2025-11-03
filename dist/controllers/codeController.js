"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCode = void 0;
const db_1 = __importDefault(require("../db"));
const generateCode_1 = require("../utils/generateCode");
const createCode = async (req, res) => {
    try {
        const { code, type, redemptionLimit, expiryAt } = req.body;
        const adminId = req.user?.id;
        if (!type || !expiryAt) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const newCode = await db_1.default.redeemCode.create({
            data: {
                code: code || (0, generateCode_1.generateCode)(),
                type,
                redemptionLimit: type === "COMMON" ? redemptionLimit : null,
                expiryAt: new Date(expiryAt),
                createdBy: adminId,
            },
        });
        res.json({ success: true, data: newCode });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.createCode = createCode;
//# sourceMappingURL=codeController.js.map