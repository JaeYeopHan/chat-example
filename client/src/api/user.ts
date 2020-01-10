import api from './index'

export interface ILoginRequestData {
  id: string
}

export interface ILoginResponseData {
  success: boolean
}

export function userLogin(
  data: ILoginRequestData,
): Promise<ILoginResponseData> {
  return api.post('/login', { data })
}
