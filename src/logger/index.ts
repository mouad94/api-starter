import { Logger } from 'winston'
import { appLogger } from './appLogger'
import * as env from 'dotenv'

env.config()

export let logger: Logger

const NODE_ENV = process.env.NODE_ENV || 'development'

// if (NODE_ENV !== 'production') {
//   logger = appLogger()
// }
logger = appLogger()
