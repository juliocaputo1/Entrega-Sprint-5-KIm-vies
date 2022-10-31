import AppDataSource from "../../data-source"
import { Categories } from "../../entities/categories.entity"

const listCategoriesService = async () => {

    const categoriesRepository = AppDataSource.getRepository(Categories)

    const categories: Array<Categories> = await categoriesRepository.find({ relations: { properties: true } })

    return categories
}

export default listCategoriesService