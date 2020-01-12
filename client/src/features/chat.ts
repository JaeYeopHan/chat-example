import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '.'

import {
  createChatRoom,
  IChatRoom,
  fetchChatRooms,
  inviteUserToRoom,
} from '@/api/chat'
import { loadingActions } from './loading'
import { connect, emit, leave } from '@/api/ws'
import { readFileToBinary } from '@/utils/file'

export interface IMessage {
  userId: string
  type: 'text' | 'image'
  contents: string
}

interface IReceivePayload {
  roomId: string
  message: IMessage
}

export interface IChatState {
  rooms: IChatRoom[]
  isAvailable: boolean
  chats: { [key: string]: IMessage[] }
}

const name = 'Chat'
const initialState = {
  rooms: [],
  isAvailable: false,
  chats: {},
}

const _ = createSlice({
  name,
  initialState,
  reducers: {
    success(state: IChatState, action: PayloadAction<IChatRoom[]>) {
      state.rooms = action.payload
    },
    connectComplete(state: IChatState) {
      state.isAvailable = true
    },
    receive(state: IChatState, action: PayloadAction<IReceivePayload>) {
      const { roomId, message } = action.payload

      if (!state.chats[roomId]) {
        state.chats[roomId] = []
      }
      state.chats[roomId].push(message)
    },
    clearRoom(state: IChatState, action: PayloadAction<string>) {
      const roomId = action.payload
      state.chats[roomId] = []
    },
  },
})

export function getChatRooms(userId: string): AppThunk {
  return async function(dispatch) {
    try {
      dispatch(loadingActions.start(name))
      const results = await fetchChatRooms({ userId })
      dispatch(chatActions.success(results))
    } catch (e) {
      console.error(e)
    } finally {
      dispatch(loadingActions.finish(name))
    }
  }
}

export function postChatRoom(userId: string): AppThunk {
  return async function(dispatch) {
    try {
      dispatch(loadingActions.start(name))
      const title = await prompt('채팅방 이름을 입력해주세요.')

      if (title) {
        await createChatRoom({ title, userId })
        dispatch(chatThunks.getChatRooms(userId))
      }
    } catch (e) {
      console.error(e)
    } finally {
      dispatch(loadingActions.finish(name))
    }
  }
}

export function initializeChat(roomId: string, me: string): AppThunk {
  return async function(dispatch) {
    const cb = (message: IMessage) =>
      dispatch(
        chatActions.receive({
          roomId,
          message,
        }),
      )
    const results = await connect(roomId, me, cb)

    if (results) {
      dispatch(chatActions.connectComplete())
    }
  }
}

export function sendMessage(
  roomId: string,
  userId: string,
  contents: string,
): AppThunk {
  return async function(dispatch) {
    if (!userId) {
      return
    }

    emit(roomId, {
      userId,
      type: 'text',
      contents,
    })
  }
}

export function sendImage(
  roomId: string,
  userId: string,
  image: File,
): AppThunk {
  return async function(dispatch) {
    try {
      if (!userId) {
        return
      }

      const contents = await readFileToBinary(image)

      emit(roomId, {
        userId,
        type: 'image',
        contents,
      })
    } catch (e) {
      console.error('Fail to upload image')
    }
  }
}

export function leaveChat(roomId: string): AppThunk {
  return async function(dispatch) {
    try {
      leave()
      dispatch(chatActions.clearRoom(roomId))
    } catch (e) {
      console.error(e)
    }
  }
}

export function inviteUser(roomId: string, targetId: string): AppThunk {
  return async function(dispatch) {
    try {
      await inviteUserToRoom({ roomId, userId: targetId })
    } catch (e) {
      console.error(e)
    }
  }
}

export const CHAT = _.name
export const chatReducer = _.reducer
export const chatActions = _.actions
export const chatThunks = {
  postChatRoom,
  getChatRooms,
  initializeChat,
  sendMessage,
  sendImage,
  leaveChat,
  inviteUser,
}
