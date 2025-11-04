import { Router } from "express";
import {createCode} from "../controllers/codeController";
import {redeemCode} from "../controllers/reedemController";
import {requireRole}  from "../middleware/role";
import {authorize} from "../middleware/auth";
import { getRedemptionHistory } from "../controllers/reedemController";

  
const router = Router();

router.post("/create",authorize,requireRole("ADMIN"), createCode);
router.post("/reedem",authorize,requireRole("USER"), redeemCode);
router.get("/history",authorize,requireRole("ADMIN"),getRedemptionHistory)


export default router;