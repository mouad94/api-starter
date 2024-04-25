import { Request, Response, NextFunction } from 'express'
import { AppError } from '../helpers/AppError'

export const withAuth = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization
  if (!token) throw new AppError('EMPTY_TOKEN', 'Access Denied', 403)
  token = token.split(' ')[1]
  if (token !== process.env.TOKEN)
    throw new AppError('INVALID_TOKEN', 'Unauthorized user', 401)
  next()
}
