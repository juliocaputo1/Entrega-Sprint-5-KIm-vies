import { Request, Response } from "express"
import userCreateServices from "../../services/users/userCreate.services"
import { AppError, handleError } from "../../errors/appError"

const userCreateController = async (req: Request, res: Response) => {
    try {
        const { name, email, password, isAdm } = req.body

        const newUser = await userCreateServices({ name, email, password, isAdm })

        return res.status(201).send(newUser)
    }
    catch (err) {
        if (err instanceof AppError) {
            handleError(err, res)
        }
    }
}

export default userCreateController