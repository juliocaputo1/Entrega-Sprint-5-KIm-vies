import { Request, Response, NextFunction } from "express"

const verifyProfile = (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params
    const uuid = req.user.id
    const isAdm = req.user.isAdm

    if (id === uuid || isAdm === true) {
        next()
    }
    else {
        return res.status(401).json({ message: "Unauthorized" })
    }
}

export default verifyProfile