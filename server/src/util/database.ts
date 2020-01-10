const logginedUsers: string[] = []
const chatRooms: ChatRoom[] = []

export interface ChatRoom {
  id: string
  title: string
  createdTime: number
}

export function loginUser(id: string): boolean {
  if (isAlreadyExistUser(id)) {
    return false
  }
  logginedUsers.push(id)
  return true
}
export function isAlreadyExistUser(id: string) {
  return logginedUsers.indexOf(id) > -1
}

export function addChatRoom(title: string): ChatRoom {
  const newChatRoom = createChatRoom(title)
  chatRooms.push(newChatRoom)
  return newChatRoom
}

export function getAllChatRoom() {
  return chatRooms
}

function createChatRoom(title: string): ChatRoom {
  const timestamp = new Date().getTime()
  const id = `chatroom_${timestamp}`

  return {
    id,
    title,
    createdTime: timestamp,
  }
}
