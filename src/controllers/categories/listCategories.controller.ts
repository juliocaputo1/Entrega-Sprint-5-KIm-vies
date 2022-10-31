import listCategoriesService from "../../services/categories/listCategories.services"

import { Request, Response } from "express"

const listCategoriesController = async (req: Request, res: Response) => {

    const output = await listCategoriesService()

    return res.status(200).json(output)
}

export default listCategoriesController