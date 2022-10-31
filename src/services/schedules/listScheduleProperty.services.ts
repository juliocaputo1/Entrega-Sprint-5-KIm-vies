import AppDataSource from "../../data-source"
import { Properties } from "../../entities/properties.entity"
import { AppError } from "../../errors/appError"


const listSchedulePropertyService = async (propertyId: string) => {

    const propertiesRepository = AppDataSource.getRepository(Properties)

    const property = await propertiesRepository.findOne({ where: { id: propertyId } })
    if (!property) throw new AppError(404, "Property does not exists")
    if (property.schedules.length === 0) throw new AppError(404, "Property has no schedules")


    return property
}

export default listSchedulePropertyService