import { createSlice } from '@reduxjs/toolkit'

import { userLogin } from '@/api/user'
import { push } from '@/utils/history'

import { AppThunk } from '.'

const name = 'User'
const initialState = {}

const _ = createSlice({
  name,
  initialState,
  reducers: {
    success() {},
    fail() {},
  },
})

export function login(id: string): AppThunk {
  return async function(dispatch) {
    try {
      const results = await userLogin({ id })

      if (results.success) {
        dispatch(userActions.success())
        push(`/chat-list/${id}`)
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
}
