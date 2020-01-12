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

export interface ILogoutRequestData {
  id: string
}

export interface ILogoutResponseData {
  success: boolean
}

export function userLogout(
  data: ILogoutRequestData,
): Promise<ILogoutResponseData> {
  return api.post('/logout', { data })
}
