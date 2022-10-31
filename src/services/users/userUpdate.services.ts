import AppDataSource from "../../data-source"
import { Users } from "../../entities/users.entity"
import bcrypt from "bcrypt"
import { IUserUpdate } from "../../interfaces/users"
import { AppError } from "../../errors/appError"

const userUpdateService = async ({ email, password, name }: IUserUpdate, id: string) => {

    const userRepository = AppDataSource.getRepository(Users)

    const users = await userRepository.find()

    const account = users.find((user) => user.id === id)

    if (password) {
        if (bcrypt.compareSync(password, account!.password)) {
            throw new AppError(409, "Inform a diferent password")
        }
        const newPassword = bcrypt.hashSync(password, 10)

        const newEmail = email

        const newName = name

        await userRepository.update(account!.id, { password: newPassword, email: newEmail, name: newName })

        const userUpdated = { password: newPassword, email: newEmail, name: newName }

        return userUpdated
    }
    else {
        const newEmail = email

        const newName = name

        await userRepository.update(account!.id, { email: newEmail, name: newName })

        const userUpdated = { email: newEmail, name: newName }

        return userUpdated
    }
}

export default userUpdateService