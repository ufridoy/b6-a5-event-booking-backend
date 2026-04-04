import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import { EventController } from "./event.controller";

const router = Router();

router.post("/create", requireAuth, EventController.createEvent)
router.get("/my-events", requireAuth, EventController.getMyEvents)
router.get("/all-events", EventController.getAllEvents)
router.get("/:id", requireAuth, EventController.getSingleEvent)
router.patch("/:id", requireAuth, EventController.updateSingleEvent)
router.delete("/:id", requireAuth, EventController.deleteEvent)

export const EventRoute = router;