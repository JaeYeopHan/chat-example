import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '.'

import { createChatRoom, IChatRoom, fetchChatRooms } from '@/api/chat'
import { loadingActions } from './loading'
import { connect } from '@/api/ws'

export interface IChatState {
  rooms: IChatRoom[]
}

const name = 'Chat'
const initialState = {
  rooms: [],
}

const _ = createSlice({
  name,
  initialState,
  reducers: {
    success(state: IChatState, action: PayloadAction<IChatRoom[]>) {
      state.rooms = action.payload
    },
  },
})

export function getChatRooms(): AppThunk {
  return async function(dispatch) {
    try {
      dispatch(loadingActions.start(name))
      const results = await fetchChatRooms()
      dispatch(chatActions.success(results))
    } catch (e) {
      console.error(e)
    } finally {
      dispatch(loadingActions.finish(name))
    }
  }
}

export function postChatRoom(): AppThunk {
  return async function(dispatch) {
    try {
      dispatch(loadingActions.start(name))
      const title = await prompt('채팅방 이름을 입력해주세요.')

      if (title) {
        await createChatRoom({ title })
        dispatch(chatThunks.getChatRooms())
      }
    } catch (e) {
      console.error(e)
    } finally {
      dispatch(loadingActions.finish(name))
    }
  }
}

export function initializeChat(id: string): AppThunk {
  return async function(dispatch) {
    const results = await connect(id)
    console.log(results)
  }
}

export const CHAT = _.name
export const chatReducer = _.reducer
export const chatActions = _.actions
export const chatThunks = {
  postChatRoom,
  getChatRooms,
  initializeChat,
}
