import { Router } from "express"

import createPropertiesController from "../controllers/properties/createPropertie.controller"
import listPropertiesController from "../controllers/properties/listProperties.controller"

import verifyAuthtoken from "../middlewares/verifyAuthToken.middleware"
import verifyAdm from "../middlewares/verifyAdm.middleware"


const router = Router()

export const propertiesRouter = () => {
    router.post("/", verifyAuthtoken, verifyAdm, createPropertiesController)

    router.get("/", listPropertiesController)

    return router
}


export default router