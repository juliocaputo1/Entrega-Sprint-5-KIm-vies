import createPropertiesService from "../../services/properties/createProperties.services"
import { Request, Response } from "express"

const createPropertiesController = async (req: Request, res: Response) => {
    const { size, value, address, categoryId } = req.body

    const output = await createPropertiesService({ size, value, address, categoryId })

    return res.status(201).json(output)
}

export default createPropertiesController