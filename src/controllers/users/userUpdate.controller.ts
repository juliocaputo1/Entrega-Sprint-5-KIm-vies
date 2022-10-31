import { Request, Response } from "express"
import userUpdateService from "../../services/users/userUpdate.services"
import { AppError, handleError } from "../../errors/appError"

const userUpdateController = async (req: Request, res: Response) => {

    try {
        const { id } = req.params

        const { password, email, name } = req.body

        const userUpdated = await userUpdateService({ email, password, name }, id)

        return res.status(200).send({ message: "Updated", userUpdated })
    }
    catch (err) {
        if (err instanceof AppError) {
            handleError(err, res)
        }
    }
}

export default userUpdateController