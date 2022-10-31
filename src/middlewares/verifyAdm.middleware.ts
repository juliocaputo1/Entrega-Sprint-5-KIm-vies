import { Request, Response, NextFunction } from "express"

const verifyAdm = (req: Request, res: Response, next: NextFunction) => {

    const isAdm = req.user.isAdm

    if (isAdm === false) {
        return res.status(403).json({ message: "Unauthorized" })
    }

    next()
}

export default verifyAdm