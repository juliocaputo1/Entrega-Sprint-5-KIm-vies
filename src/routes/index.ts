import { Express } from "express"

import { usersRouter } from "./user.routes"
import { categoriesRouter } from "./categories.routes"
import { loginRouter } from "./login.routes"
import { propertiesRouter } from "./properties.routes"
import { schedulesRouter } from "./schedules.routes"


export const appRouter = (app: Express) => {
    app.use("/users", usersRouter())
    app.use("/categories", categoriesRouter())
    app.use("/login", loginRouter())
    app.use("/properties", propertiesRouter())
    app.use("/schedules", schedulesRouter())
}
