import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { userLogin, userLogout } from '@/api/user'
import { push } from '@/utils/history'

import { AppThunk } from '.'

export interface IUserState {
  me: string
}

const name = 'User'
const initialState: IUserState = {
  me: '',
}

const _ = createSlice({
  name,
  initialState,
  reducers: {
    success(state: IUserState, action: PayloadAction<string>) {
      state.me = action.payload
    },
    fail() {},
  },
})

export function login(id: string): AppThunk {
  return async function(dispatch) {
    try {
      const results = await userLogin({ id })

      if (results.success) {
        dispatch(userActions.success(id))
        push(`/chat-list/${id}`)
      } else {
        dispatch(userActions.fail())
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export function logout(id: string): AppThunk {
  return async function(dispatch) {
    try {
      const results = await userLogout({ id })

      if (results.success) {
        dispatch(userActions.success(''))
        alert(`로그아웃 되었습니다. ${id}`)
      } else {
        dispatch(userActions.fail())
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export const USER = _.name
export const userReducer = _.reducer
export const userActions = _.actions
export const userThunks = {
  login,
  logout,
}
