import { Router } from "express";
import { AdminController } from "./admin.controller";
import { requireAuth } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middlewere";

const router = Router();

router.get(
  "/users",
  requireAuth,
  requireRole("ADMIN"),
  AdminController.getAllUsers,
);
router.get(
  "/events",
  requireAuth,
  requireRole("ADMIN"),
  AdminController.getAllEvents,
);

router.delete(
    "/events/:id",
    requireAuth,
    requireRole("ADMIN"),
    AdminController.deleteEventByAdmin
)

router.delete(
    "/users/:id",
    requireAuth,
    requireRole("ADMIN"),
    AdminController.deleteUserByAdmin
)

export const AdminRoute = router;
