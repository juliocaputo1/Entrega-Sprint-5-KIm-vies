import AppDataSource from "../../data-source"
import { Properties } from "../../entities/properties.entity"
import { Categories } from "../../entities/categories.entity"
import { AppError } from "../../errors/appError"

const listCategoriesPropertiesService = async (id: string) => {

    const categoriesRepository = AppDataSource.getRepository(Categories)

    const category = await categoriesRepository.findOne({ where: { id: id }, relations: { properties: true } })

    if (!category) throw new AppError(404, "category not found")

    return category
}

export default listCategoriesPropertiesService