import AppDataSource from "../../data-source"
import { Addresses } from "../../entities/adresses.entity"
import { Categories } from "../../entities/categories.entity"
import { Properties } from "../../entities/properties.entity"
import { AppError } from "../../errors/appError"
import { IAddressRequest, IPropertyRequest } from "../../interfaces/properties"



const createPropertiesService = async ({ size, value, address, categoryId }: IPropertyRequest) => {
    const propertyRepository = AppDataSource.getRepository(Properties)
    const addressRepository = AppDataSource.getRepository(Addresses)
    const categoriesRepository = AppDataSource.getRepository(Categories)

    let category: any = ""
    try {
        category = await categoriesRepository.findOne({ where: { id: categoryId } })
    } catch (error) {
        if (error instanceof Error) throw new AppError(404, "invalid category")
    }
    if (!category) throw new AppError(404, "Invalid category")


    const { city, district, state, zipCode, number }: IAddressRequest = address

    const isAddressAlreadyRegistered = number ? await addressRepository.findOne(
        {
            where:
            {
                city: city,
                district: district,
                state: state,
                zipCode: zipCode,
                number: number
            }
        }
    ) : await addressRepository.findOne(
        {
            where:
            {
                city: city,
                district: district,
                state: state,
                zipCode: zipCode
            }
        }
    )

    if (isAddressAlreadyRegistered) throw new AppError(400, "Address is already registered")

    if (state.length > 2) throw new AppError(400, "Invalid state")
    if (zipCode.length > 8) throw new AppError(400, "Invalid ZipCode")

    const newAddress = new Addresses()
    newAddress.city = city
    newAddress.district = district
    newAddress.state = state
    newAddress.zipCode = zipCode
    if (number) newAddress.number = number

    let createdAddress: Addresses
    try {
        createdAddress = await addressRepository.save(newAddress)
    } catch (error) {
        if (error instanceof Error) throw new AppError(400, error.message)
    }



    const newProperty = new Properties()
    newProperty.size = size
    newProperty.value = value
    newProperty.address = createdAddress!
    newProperty.category = category!

    let output
    try {
        output = await propertyRepository.save(newProperty)
    } catch (error) {
        if (error instanceof Error) throw new AppError(400, error.message)
    }


    return output
}

export default createPropertiesService