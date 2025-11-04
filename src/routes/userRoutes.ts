import { Router } from "express";
import { registerUsers } from "../controllers/userControllers";
import { getUser } from "../controllers/userControllers";
const router = Router();

router.post("/register",registerUsers);
router.post("/login",getUser);  

export default router;    