import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import "dotenv/config"

const verifyAuthtoken = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ message: "Token necessary" })
    }
    token = token.split(" ")[1]
    jwt.verify(token as string, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
        if (err) {
            return res.status(403).json({ message: "Invalid Token" })
        }
        req.user = {
            userEmail: decoded.email,
            isAdm: decoded.isAdm,
            id: decoded.id,
            isActive: decoded.isActive
        }
        next()
    })
}

export default verifyAuthtoken