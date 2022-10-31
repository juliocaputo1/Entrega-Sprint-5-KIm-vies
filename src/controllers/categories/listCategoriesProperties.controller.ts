import listCategoryPropertiesService from "../../services/categories/listCategoriesProperties.services"

import { Request, Response } from "express"

const listCategoriesPropertiesController = async (req: Request, res: Response) => {

    const { id } = req.params

    const output = await listCategoryPropertiesService(id)

    return res.status(200).json(output)
}

export default listCategoriesPropertiesController