import createCategoriesService from "../../services/categories/createCategories.services"
import { Request, Response } from "express"
import { ICategoryRequest } from "../../interfaces/categories/index"


const createCategoriesController = async (req: Request, res: Response) => {

    const { name }: ICategoryRequest = req.body

    const output = await createCategoriesService({ name })

    return res.status(201).json(output)
}

export default createCategoriesController