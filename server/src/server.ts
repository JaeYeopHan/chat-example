import { Socket } from 'socket.io'
import errorHandler from 'errorhandler'

import app from './app'

export interface IMessage {
  userId: string
  type: 'text' | 'image'
  contents: string
}

export interface IJoinRoom {
  roomId: string
  me: string
}

export interface ISendMessage {
  roomId: string
  message: IMessage
}

app.use(errorHandler())

const server = app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env'),
  )
  console.log('  Press CTRL-C to stop\n')
})

const io = require('socket.io').listen(server)

io.origins('*:*')

const chat = io.of('/chat').on('connection', (socket: Socket) => {
  socket.on('send:message', ({ roomId, message }: ISendMessage) => {
    chat.to(roomId).emit('send:message', message)
  })

  socket.on('join:room', ({ me, roomId }: IJoinRoom) => {
    socket.join(roomId, () => {
      const data: IMessage = {
        userId: '__admin__',
        contents: `${me} user has joined the room`,
        type: 'text',
      }
      chat.to(roomId).emit('send:message', data)
    })
  })
})

export default server
