import api from './index'

export interface ICreateChatRoomRequestData {
  title: string
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

export function fetchChatRooms(): Promise<IChatRoom[]> {
  return api.get('/chatrooms')
}
