import { combineReducers } from '@reduxjs/toolkit'
import { Action, configureStore } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'

import { USER, userReducers } from './user'

const rootReducer = combineReducers({
  [USER]: userReducers,
})

const store = configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export default store
