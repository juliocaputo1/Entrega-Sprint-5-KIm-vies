import listSchedulePropertyService from "../../services/schedules/listScheduleProperty.services"
import { Request, Response } from "express"

const listSchedulePropertyController = async (req: Request, res: Response) => {
    const { id } = req.params
    const output = await listSchedulePropertyService(id)

    return res.status(200).json(output)
}

export default listSchedulePropertyController