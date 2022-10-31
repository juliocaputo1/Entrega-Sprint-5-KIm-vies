import listPropertiesService from "../../services/properties/listProperties.services"
import { Request, Response } from "express"

const listPropertiesController = async (req: Request, res: Response) => {

    const output = await listPropertiesService()

    return res.json(output)
}

export default listPropertiesController
