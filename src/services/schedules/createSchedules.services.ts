import AppDataSource from "../../data-source"
import { Properties } from "../../entities/properties.entity"
import { Schedules } from "../../entities/schedules.entity"
import { Users } from "../../entities/users.entity"
import { AppError } from "../../errors/appError"
import { IScheduleRequest } from "../../interfaces/schedules"

const createScheduleService = async ({ date, hour, propertyId, userId }: IScheduleRequest) => {

    const schedulesRepository = AppDataSource.getRepository(Schedules)
    const propertiesRepository = AppDataSource.getRepository(Properties)
    const usersRepository = AppDataSource.getRepository(Users)


    if (!userId) throw new AppError(404, "User not found")
    const user = await usersRepository.findOne({ where: { id: userId } })

    const scheduleHourString = new Date("2022/12/30 " + hour).toTimeString().split(" ")[0]
    if (scheduleHourString.toLowerCase() === "invalid") throw new AppError(400, "Wrong hour fourmat")
    const scheduleHour = new Date("2022/12/30 " + hour).getHours()
    const scheduleMinutes = new Date("2022/12/30 " + hour).getMinutes()
    if (scheduleHour < 8 || scheduleHour > 18) {
        throw new AppError(400, "Schedules can only be made between 8 and 18")
    } else if (scheduleHour === 8 || scheduleHour === 18) {
        if (scheduleMinutes !== 0) throw new AppError(400, "Schedules can only be made between 8 and 18")
    }


    const scheduleDateString = new Date(date).toLocaleDateString("zh-CN")
    if (scheduleDateString.toLowerCase() === "invalid date") throw new AppError(400, "Wrong date format")
    const scheduleDateDay = new Date(date).toDateString().split(" ")[0]
    if (scheduleDateDay === "Sat" || scheduleDateDay === "Sun") throw new AppError(400, "Closed Sundays and Saturdays")

    const property = await propertiesRepository.findOneBy({ id: propertyId })
    if (!property) throw new AppError(404, "Property not found")


    const isDateAndHourTaken = property.schedules.some(schedule => {
        console.log(schedule.date, scheduleDateString)
        console.log(schedule.hour, scheduleHourString)
        return (schedule.date === scheduleDateString && schedule.hour === scheduleHourString)
    })
    if (isDateAndHourTaken) throw new AppError(400, "Hour and date is already taken")



    const schedule = new Schedules()
    schedule.date = scheduleDateString
    schedule.hour = scheduleHourString
    schedule.property = property
    schedule.user = user!

    let newSchedule
    try {
        newSchedule = await schedulesRepository.save(schedule)
    } catch (error) {
        if (error instanceof Error) throw new AppError(400, error.message)
    }


    return newSchedule
}

export default createScheduleService