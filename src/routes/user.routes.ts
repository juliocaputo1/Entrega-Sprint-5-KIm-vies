import { Router } from "express"

import userCreateController from "../controllers/users/userCreate.controller"
import userLoginController from "../controllers/users/userLogin.controller"
import userListController from "../controllers/users/userList.controller"
import userUpdateController from "../controllers/users/userUpdate.controller"
import userDeleteController from "../controllers/users/userDelete.controller"

import verifyAuthtoken from "../middlewares/verifyAuthToken.middleware"
import verifyAdm from "../middlewares/verifyAdm.middleware"
import verifyProfile from "../middlewares/verifyProfile.middleware"

const router = Router()

export const usersRouter = () => {
    router.post("/", userCreateController)

    router.post("/login", userLoginController)

    router.get("/", verifyAuthtoken, verifyAdm, userListController)

    router.patch("/:id", verifyAuthtoken, verifyProfile, userUpdateController)

    router.delete("/:id", verifyAuthtoken, verifyAdm, userDeleteController)

    return router
}


export default router