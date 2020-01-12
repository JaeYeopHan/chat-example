import io from 'socket.io-client'

import { BASE_URL } from '.'
import { IMessage } from '@/features/chat'

let socket: any = null

type ReceiveCallback = (message: IMessage) => void

export interface IJoinRoom {
  roomId: string
  me: string
}

export interface ISendMessage {
  roomId: string
  message: IMessage
}

export async function connect(
  roomId: string,
  me: string,
  receiveCallback: ReceiveCallback,
) {
  socket = io.connect(`${BASE_URL}/chat`)

  return new Promise(resolve => {
    socket.on('connect', () => {
      socket.on('send:message', (message: IMessage) => {
        receiveCallback(message)
      })

      const data: IJoinRoom = { roomId, me }
      socket.emit('join:room', data)
      resolve(true)
    })
  })
}

export function emit(roomId: string, message: IMessage) {
  const data: ISendMessage = { roomId, message }
  socket.emit('send:message', data)
}

export function leave() {
  socket.disconnect()
}
