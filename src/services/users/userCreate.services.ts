import { Users } from "../../entities/users.entity"
import { IUserRequest } from "../../interfaces/users"
import AppDataSource from "../../data-source"
import bcrypt from "bcrypt"
import { userWithoutPass } from "../../utils"
import { AppError } from "../../errors/appError"

const userCreateServices = async ({ name, email, password, isAdm }: IUserRequest) => {

    const userRepository = AppDataSource.getRepository(Users)

    const users = await userRepository.find()

    const emailAlreadyExists = users.find((user) => user.email == email)

    if (emailAlreadyExists) {
        throw new AppError(400, "Email already exists")
    }
    else {
        const user = new Users()
        user.name = name
        user.email = email
        user.password = bcrypt.hashSync(password, 10)
        user.isAdm = isAdm

        userRepository.create(user)
        await userRepository.save(user)

        return userWithoutPass(user)
    }
}

export default userCreateServices