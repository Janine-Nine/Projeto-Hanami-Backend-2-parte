import express from "express"
import cors from "cors"
import routes from "./routes"
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./swagger"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", routes)
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default app
