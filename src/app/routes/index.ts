import { Router } from "express";
import { AuthRoute } from "../modules/auth/auth.route";
import { UserRoute } from "../modules/user/user.route";
import { EventRoute } from "../modules/event/event.route";


const router = Router()


router.use("/auth", AuthRoute)
router.use("/users", UserRoute)
router.use("/events", EventRoute)

export const indexRoute =  router;