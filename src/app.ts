import "reflect-metadata"
import "express-async-errors"
import express, { Request, Response, NextFunction } from "express"
import { AppError } from "./errors/appError"
import { appRouter } from "./routes"


const app = express()
app.use(express.json())
appRouter(app)

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message
        })
    }
    console.log(err)
    return res.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

export default app