import { combineReducers } from '@reduxjs/toolkit'
import { Action, configureStore } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'

import { USER, userReducer } from './user'
import { CHAT, chatReducer } from './chat'
import { LOADING, loadingReducer } from './loading'

const rootReducer = combineReducers({
  [CHAT]: chatReducer,
  [USER]: userReducer,
  [LOADING]: loadingReducer,
})

const store = configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export default store
