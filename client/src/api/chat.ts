import api from './index'

export interface IFetchChatRoomRequestData {
  userId: string
}

export interface ICreateChatRoomRequestData {
  title: string
  userId: string
}

export interface IChatRoom {
  id: string
  title: string
  createdTime: number
}

export interface ICreateChatRoomResponseData extends IChatRoom {}

export function createChatRoom(
  data: ICreateChatRoomRequestData,
): Promise<ICreateChatRoomResponseData> {
  return api.post('/chatrooms', { data })
}

export function fetchChatRooms(
  params: IFetchChatRoomRequestData,
): Promise<IChatRoom[]> {
  return api.get('/chatrooms', { params })
}

interface IInviteUserToRoomRequestData {
  roomId: string
  userId: string
}

export function inviteUserToRoom(data: IInviteUserToRoomRequestData) {
  return api.post('/chatrooms/invite', { data })
}
