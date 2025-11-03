"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const codeController_1 = require("../controllers/codeController");
const reedemController_1 = require("../controllers/reedemController");
const role_1 = require("../middleware/role");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/create", auth_1.authorize, (0, role_1.requireRole)("ADMIN"), codeController_1.createCode);
router.post("/reedem", auth_1.authorize, (0, role_1.requireRole)("USER"), reedemController_1.redeemCode);
exports.default = router;
//# sourceMappingURL=codeRoutes.js.map