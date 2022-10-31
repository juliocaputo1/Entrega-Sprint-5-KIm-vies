import { ICategoryRequest } from "../../interfaces/categories"

import AppDataSource from "../../data-source"
import { Categories } from "../../entities/categories.entity"
import { AppError } from "../../errors/appError"

const createCategoriesService = async ({ name }: ICategoryRequest) => {
    const categoriesRepository = AppDataSource.getRepository(Categories)

    if (typeof name != "string") throw new AppError(400, "Name must be a string")

    const isCategoryAlreadyRegistered: Categories | null = await categoriesRepository.findOneBy({ name: name })
    if (isCategoryAlreadyRegistered) throw new AppError(400, "Category already registered")


    const newCategory = new Categories()
    newCategory.name = name

    const output = await categoriesRepository.save(newCategory)

    return output
}

export default createCategoriesService