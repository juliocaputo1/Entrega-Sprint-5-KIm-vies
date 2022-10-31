import { Request, Response } from "express"
import userDeleteService from "../../services/users/userDelete.services"
import { AppError, handleError } from "../../errors/appError"

const userDeleteController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const isActive = req.user.isActive

        await userDeleteService(id, isActive, res)

        return res.status(204).json({ message: "User deleted with success" })
    }
    catch (err) {
        if (err instanceof AppError) {
            handleError(err, res)
        }
    }

}

export default userDeleteController