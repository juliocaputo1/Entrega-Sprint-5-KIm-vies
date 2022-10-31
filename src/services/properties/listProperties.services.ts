import AppDataSource from "../../data-source"
import { Properties } from "../../entities/properties.entity"


const listPropertiesService = async () => {
    const propertiesRepository = AppDataSource.getRepository(Properties)
    const properties: Array<Properties> = await propertiesRepository.find({ relations: { category: true } })

    return properties
}

export default listPropertiesService