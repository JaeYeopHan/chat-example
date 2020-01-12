import './ChatList.scss'

import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { chatThunks, CHAT, IChatState } from '@/features/chat'
import { RootState } from '@/features'
import { LOADING, ILoadingState } from '@/features/loading'
import { Loading } from '../shared/Loading'

import { USER, IUserState, userThunks } from '@/features/user'
import { Rooms } from './Rooms'
import { useCheckLogin } from '@/hooks/useCheckLogin'

export const ChatList = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { me } = useSelector<RootState, IUserState>(state => state[USER])
  const state = useSelector<RootState, IChatState>(state => state[CHAT])
  const loading = useSelector<RootState, ILoadingState>(state => state[LOADING])

  const handleClickCreate = () => {
    dispatch(chatThunks.postChatRoom(me))
  }
  const handleClickLogout = () => {
    dispatch(userThunks.logout(me))
  }

  useCheckLogin(me)
  useEffect(() => {
    dispatch(chatThunks.getChatRooms(me))
  }, [dispatch, me])

  return (
    <main className="main">
      <h2 className="title">ChatList</h2>
      <h3 className="welcome-message">Hello, {id}</h3>
      <div className="btn-wrapper">
        <button className="btn create-btn" onClick={handleClickCreate}>
          Create
        </button>
        <button className="btn logout-btn" onClick={handleClickLogout}>
          Logout
        </button>
      </div>
      <ul className="room-wrapper">
        {loading[CHAT] ? <Loading /> : <Rooms rooms={state.rooms} />}
      </ul>
    </main>
  )
}
