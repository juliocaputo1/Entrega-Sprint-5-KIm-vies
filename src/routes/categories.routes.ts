import createCategoriesController from "../controllers/categories/createCategories.controller";
import listCategoriesController from "../controllers/categories/listCategories.controller";
import listCategoriesPropertiesController from "../controllers/categories/listCategoriesProperties.controller";

import { Router } from "express";
import verifyAuthtoken from "../middlewares/verifyAuthToken.middleware"
import verifyAdm from "../middlewares/verifyAdm.middleware";

const router = Router()

export const categoriesRouter = () => {
    router.post("/", verifyAuthtoken, verifyAdm, createCategoriesController)

    router.get("/", listCategoriesController)

    router.get("/:id/properties", listCategoriesPropertiesController)

    return router
}

export default router