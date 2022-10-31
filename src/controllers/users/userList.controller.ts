import { Request, Response } from "express"
import userListServices from "../../services/users/userList.services"
import { instanceToPlain } from "class-transformer"
import { AppError, handleError } from "../../errors/appError"

const userListController = async (req: Request, res: Response) => {
    try {
        const users = await userListServices()

        return res.status(201).send(instanceToPlain(users))
    }
    catch (err) {
        if (err instanceof AppError) {
            handleError(err, res)
        }
    }
}

export default userListController