const logginedUsers: string[] = []

export function loginUser(id: string): boolean {
  if (isAlreadyExistUser) {
    return false
  }
  logginedUsers.push(id)
  console.log(logginedUsers)
  return true
}
export function isAlreadyExistUser(id: string) {
  return logginedUsers.indexOf(id) > -1
}
