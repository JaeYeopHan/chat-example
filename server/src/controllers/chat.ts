import { Request, Response, NextFunction } from 'express'
import { addChatRoom, getAllChatRoom, inviteUser } from '../util/database'

export async function createChatRoom(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { title, userId } = req.body.data
  const chatRoom = addChatRoom(title, userId)

  res.json({
    code: 1000,
    message: 'Success',
    results: {
      ...chatRoom,
    },
  })
}

export async function getChatRooms(req: Request, res: Response) {
  const { userId } = req.query
  const chatRooms = getAllChatRoom(userId)

  res.json({
    code: 1000,
    message: 'Success',
    results: chatRooms,
  })
}

export async function inviteUserToRoom(req: Request, res: Response) {
  const { roomId, userId } = req.body.data

  const results = inviteUser(roomId, userId)

  res.json({
    code: 1000,
    message: 'Success',
    results,
  })
}
