import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { AppError } from '../helpers/AppError'
import { logger } from '../../../logger'

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    logger.error('Validation error')
    return res
      .status(400)
      .send({ error: 'VALIDATION_ERROR', message: error.issues })
  }

  if (error instanceof AppError) {
    logger.error(error.message)
    return res
      .status(error.statusCode)
      .send({ error: error.errorCode, message: error.message })
  }

  return res
    .status(500)
    .send({ error: 'INTERNAL_SERVER_ERROR', message: error.message })
}
