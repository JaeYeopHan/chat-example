import { Request, Response, NextFunction } from 'express'
import { loginUser, logoutUser } from '../util/database'

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

export async function logout(req: Request, res: Response) {
  const { id } = req.body.data
  const isSuccess = logoutUser(id)

  if (!isSuccess) {
    res.json({
      code: 4000,
      message: 'Not found loggined user',
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
