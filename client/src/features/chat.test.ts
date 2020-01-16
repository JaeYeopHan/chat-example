import { IMessage } from './../../../server/src/server'
import { chatReducer, chatActions } from './chat'
const defaultState = {
  rooms: [],
  isAvailable: false,
  chats: {},
}

test('connectComplete action', () => {
  // Given
  const state = { ...defaultState }

  // When
  const result = chatReducer(state, chatActions.connectComplete())

  // Then
  expect(result.isAvailable).toBe(true)
})

test('receive action', () => {
  // Given
  const roomId = 'test1'
  const messageText = 'test message'
  const message: IMessage = {
    userId: 'userId',
    type: 'text',
    contents: messageText,
  }
  const state = { ...defaultState }

  // When
  const result = chatReducer(state, chatActions.receive({ roomId, message }))

  // Then
  const expected = {
    [roomId]: [message],
  }
  expect(result.chats).toEqual(expected)
})

test('clearRoom action', () => {
  // Given
  const roomId = 'test1'
  const state = {
    ...defaultState,
    chats: {
      ['test1']: ['1', '2', '3'],
      ['test2']: ['4', '5'],
    },
  }
  // When
  const result = chatReducer(state, chatActions.clearRoom(roomId))

  // Then
  const expected = {
    [roomId]: [],
    ['test2']: ['4', '5'],
  }
  expect(result.chats).toEqual(expected)
})
