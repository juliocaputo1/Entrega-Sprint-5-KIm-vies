import { IUserLogin } from "../../interfaces/users"
import AppDataSource from "../../data-source"
import { Users } from "../../entities/users.entity"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AppError } from "../../errors/appError"

const userLoginService = async ({ email, password }: IUserLogin) => {
    const userRepository = AppDataSource.getRepository(Users)

    const users = await userRepository.find()

    const account = users.find((user) => user.email === email)

    const isAdm = account?.isAdm

    const isActive = account?.isActive

    const id = account?.id

    if (!account) {
        throw new AppError(403, "Wrong Email or Password")
    }
    if (!bcrypt.compareSync(password, account.password)) {
        throw new AppError(403, "Wrong Email or Password")
    }

    const token = jwt.sign(
        {
            email: email,
            isAdm: isAdm,
            id: id,
            isActive: isActive
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
    )

    return token
}

export default userLoginService