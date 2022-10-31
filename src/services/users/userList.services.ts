import { Users } from "../../entities/users.entity"
import AppDataSource from "../../data-source"

const userListServices = async () => {

    const userRepository = AppDataSource.getRepository(Users)

    const users = userRepository.find()

    return users
}

export default userListServices