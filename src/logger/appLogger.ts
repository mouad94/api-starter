import { createLogger, format, transports } from 'winston'

const { combine, timestamp, printf } = format

const myFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level}] ${message}`
})

export const appLogger = () => {
  return createLogger({
    level: 'info',
    format: combine(
      format.colorize(),
      timestamp({ format: 'DD/MMM/YYYY:HH:mm:ss ZZ' }),
      myFormat
    ),
    transports: [
      new transports.File({ filename: 'logs/error.log', level: 'error' }),
      new transports.File({ filename: 'logs/combined.log' }),
      new transports.Console(),
    ],
  })
}
