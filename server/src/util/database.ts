let logginedUsers: string[] = []
const chatRooms: ChatRoom[] = []

export interface ChatRoom {
  id: string
  title: string
  createdTime: number
  users: string[]
}

export function loginUser(userId: string): boolean {
  if (isAlreadyExistUser(userId)) {
    return false
  }
  logginedUsers.push(userId)
  return true
}

export function isAlreadyExistUser(userId: string): boolean {
  return logginedUsers.indexOf(userId) > -1
}

export function logoutUser(userId: string): boolean {
  if (logginedUsers.indexOf(userId) === -1) {
    return false
  }
  const filtered = logginedUsers.filter(id => id !== userId)

  logginedUsers = filtered
  return true
}

export function addChatRoom(title: string, userId: string): ChatRoom {
  const newChatRoom = createChatRoom(title)
  addUserToRoom(newChatRoom, userId)
  chatRooms.push(newChatRoom)
  return newChatRoom
}

export function getAllChatRoom(userId: string) {
  return chatRooms.filter(room => {
    return room.users.indexOf(userId) > -1
  })
}

export function inviteUser(roomId: string, userId: string) {
  const results = chatRooms.find(room => room.id === roomId)?.users.push(userId)

  return !!results
}

function createChatRoom(title: string): ChatRoom {
  const timestamp = new Date().getTime()
  const id = `chatroom_${timestamp}`

  return {
    id,
    title,
    createdTime: timestamp,
    users: [],
  }
}

function addUserToRoom(room: ChatRoom, userId: string) {
  room.users.push(userId)
}
