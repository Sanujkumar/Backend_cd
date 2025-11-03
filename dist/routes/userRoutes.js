"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const userControllers_2 = require("../controllers/userControllers");
const router = (0, express_1.Router)();
router.post("/register", userControllers_1.registerUsers);
router.get("/login", userControllers_2.getUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map