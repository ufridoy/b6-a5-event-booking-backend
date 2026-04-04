import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import { UserController } from "./user.controller";

const router = Router();

router.get("/me", requireAuth, UserController.getMe)

export const UserRoute = router;