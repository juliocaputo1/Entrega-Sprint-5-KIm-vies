import { Router } from "express"

import userLoginController from "../controllers/users/userLogin.controller"

const router = Router()

export const loginRouter = () => {

    router.post("/", userLoginController)

    return router
}


export default router
