import { login, userActions, logout } from './user'

const loginApi: jest.Mock = require('@/api/user').userLogin
const logoutApi: jest.Mock = require('@/api/user').userLogout
const push: jest.Mock = require('@/utils/history').push
const redirect: jest.Mock = require('@/utils/history').redirect

jest.mock('@/api/user', () => ({
  userLogin: jest.fn(),
  userLogout: jest.fn(),
}))
jest.mock('@/utils/history', () => ({
  push: jest.fn(),
  redirect: jest.fn(),
}))

describe('login thunk function', () => {
  test('dispatches success', async () => {
    // Given
    const dispatch = jest.fn()
    const getState = jest.fn()
    loginApi.mockResolvedValue({ success: true })

    // When
    await login('testUser')(dispatch, getState, null)

    // Then
    expect(dispatch).toHaveBeenLastCalledWith(userActions.success('testUser'))
    expect(push).toBeCalledWith(`/chat-list/testUser`)
  })

  test('dispatches fail', async () => {
    // Given
    const dispatch = jest.fn()
    const getState = jest.fn()
    loginApi.mockResolvedValue({ success: false })

    // When
    await login('testUser')(dispatch, getState, null)

    // Then
    expect(dispatch).toHaveBeenLastCalledWith(userActions.fail())
  })
})

describe('logout thunk function', () => {
  test('dispatches success', async () => {
    // Given
    window.alert = jest.fn()

    const dispatch = jest.fn()
    const getState = jest.fn()
    logoutApi.mockResolvedValue({ success: true })

    // When
    await logout('testUser')(dispatch, getState, null)

    // Then
    expect(dispatch).toHaveBeenLastCalledWith(userActions.success(''))
    expect(window.alert).toBeCalled()
    expect(redirect).toBeCalledWith('/')
  })

  test('dispatches fail', async () => {
    // Given
    const dispatch = jest.fn()
    const getState = jest.fn()
    logoutApi.mockResolvedValue({ success: false })

    // When
    await logout('testUser')(dispatch, getState, null)

    // Then
    expect(dispatch).toHaveBeenLastCalledWith(userActions.fail())
  })
})
