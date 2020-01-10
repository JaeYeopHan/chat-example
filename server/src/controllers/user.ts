import { Request, Response, NextFunction } from 'express'
import { loginUser } from '../util/database'

export async function login(req: Request, res: Response, next: NextFunction) {
  const { id } = req.body.data
  const isSuccess = loginUser(id)

  if (!isSuccess) {
    res.json({
      code: 4000,
      message: 'Alreay loggined user',
      results: {
        success: false,
      },
    })
    return
  }
  res.json({
    code: 1000,
    message: 'Success',
    results: {
      success: true,
    },
  })
}
