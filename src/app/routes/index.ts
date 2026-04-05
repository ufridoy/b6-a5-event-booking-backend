import { Router } from "express";
import { AuthRoute } from "../modules/auth/auth.route";
import { UserRoute } from "../modules/user/user.route";
import { EventRoute } from "../modules/event/event.route";
import { AdminRoute } from "../modules/admin/admin.route";


const router = Router()


router.use("/auth", AuthRoute)
router.use("/users", UserRoute)
router.use("/events", EventRoute)
router.use("/admin", AdminRoute)


export const indexRoute =  router;