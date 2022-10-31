import { IUser } from "../interfaces/users"

export const userWithoutPass = (user: IUser) => {
    const { password, ...rest } = user

    return rest
}

export default userWithoutPass
