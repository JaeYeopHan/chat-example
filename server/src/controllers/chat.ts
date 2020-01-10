import { Request, Response, NextFunction } from 'express'
import { addChatRoom, getAllChatRoom } from '../util/database'

export async function createChatRoom(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { title } = req.body.data
  const chatRoom = addChatRoom(title)

  res.json({
    code: 1000,
    message: 'Success',
    results: {
      ...chatRoom,
    },
  })
}

export async function getChatRooms(req: Request, res: Response) {
  const chatRooms = getAllChatRoom()

  res.json({
    code: 1000,
    message: 'Success',
    results: chatRooms,
  })
}
