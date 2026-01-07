import { Router } from "express";
import { diagnose } from "../controllers/diagnosis.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, diagnose);

export default router;
