import createScheduleService from "../../services/schedules/createSchedules.services"

import { Request, Response } from "express"
import { IScheduleRequest } from "../../interfaces/schedules"
import jwt from "jsonwebtoken"

const createScheduleController = async (req: Request, res: Response) => {
    const { date, hour, propertyId }: IScheduleRequest = req.body
    const { authorization } = req.headers;
    const token = authorization!.split(" ")[1]
    const { id } = jwt.decode(token) as { id: string }
    const userId = id

    const output = await createScheduleService({ date, hour, propertyId, userId })

    return res.status(201).json({ message: "schedule created" })
}

export default createScheduleController