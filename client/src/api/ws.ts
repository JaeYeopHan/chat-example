import io from 'socket.io-client'
import { BASE_URL } from '.'

const socket = io.connect(BASE_URL)

export async function connect(id: string) {
  return new Promise((resolve, reject) => {
    socket.on('connect', function() {
      console.log('[SOCKET] Connected!')
      resolve()
    })
  })
}
