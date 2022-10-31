import { Router } from "express"

import createScheduleController from "../controllers/schedules/createSchedule.controller"
import listSchedulePropertyController from "../controllers/schedules/listScheduleProperty.controller"

import verifyAuthtoken from "../middlewares/verifyAuthToken.middleware"

const router = Router()

export const schedulesRouter = () => {
    router.post("/", verifyAuthtoken, createScheduleController)

    router.get("/properties/:id", verifyAuthtoken, listSchedulePropertyController)

    return router
}


export default router