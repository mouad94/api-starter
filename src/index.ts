import express, { Application } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import compression from 'compression'
import responseTime from 'response-time'
import { withAuth } from './api/v1/middlewares/withAuth'
import { errorHandler } from './api/v1/middlewares/errorHandler'
import * as env from 'dotenv'
import { logger } from './logger'

env.config()

const app: Application = express()
const PORT = process.env.PORT || 3000

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(responseTime())
app.use(compression())

app.use(withAuth)

app.use('/api/', (req, res) => {
  res.json({ message: 'Welcome to the API' })
})

app.use(errorHandler)

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`)
})
