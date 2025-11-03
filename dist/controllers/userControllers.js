"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.registerUsers = void 0;
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
const registerUsers = async (req, res) => {
    try {
        console.log("hi register api");
        const { name, email, password, role } = req.body;
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const user = await db_1.default.user.create({
            data: {
                name,
                email,
                password: hashPassword,
                role
            },
        });
        res.status(200).json({
            message: "Registered successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.registerUsers = registerUsers;
const getUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                success: false,
                error: "please fill all fields"
            });
            return;
        }
        const isUserExist = await db_1.default.user.findFirst({
            where: { email },
            select: { id: true, name: true, password: true, email: true, role: true }
        });
        if (!isUserExist) {
            res.status(404).json({
                success: true,
                error: "user doesn't exist"
            });
            return;
        }
        if (isUserExist) {
            const isPassword = await bcrypt_1.default.compare(password, isUserExist.password);
            if (!isPassword) {
                res.status(401).json({
                    success: false,
                    message: "password is not correct"
                });
                return;
            }
            isUserExist.password = "";
        }
        const user = {
            name: isUserExist.name,
            password: isUserExist.password,
            email: isUserExist.email,
            role: isUserExist.role,
            id: isUserExist.id
        };
        const token = jsonwebtoken_1.default.sign({
            user: user
        }, JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({
            success: true,
            message: "login successfully",
            token,
            user: {
                id: isUserExist.id,
                name: isUserExist.name,
                email: isUserExist.email,
                role: isUserExist.role
            }
        });
    }
    catch (err) {
        res.status(500).json({
            message: "internal server err"
        });
    }
};
exports.getUser = getUser;
//# sourceMappingURL=userControllers.js.map