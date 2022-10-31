import AppDataSource from "../../data-source"
import { Users } from "../../entities/users.entity"
import { Response } from "express"
import { AppError } from "../../errors/appError"

const userDeleteService = async (id: string, isActive: boolean, res: Response) => {

    const userRepository = AppDataSource.getRepository(Users)

    const users = await userRepository.find()

    const account = users.find((user) => user.id === id)

    if (!account) {
        throw new AppError(404, "Invalid Id")
    }
    if (account.isActive === false) {
        return res.status(400).json({ message: "User already inactive" })
    }

    await userRepository.update(account!.id, { isActive: false })

    return true
}

export default userDeleteService