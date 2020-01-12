import './ChatList.scss'

import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { chatThunks, CHAT, IChatState } from '@/features/chat'
import { RootState } from '@/features'
import { push } from '@/utils/history'
import { IChatRoom } from '@/api/chat'
import { LOADING, ILoadingState } from '@/features/loading'
import { Loading } from '../shared/Loading'

import { getDate } from '@/utils/date'
import { USER, IUserState } from '@/features/user'

export const ChatList = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { me } = useSelector<RootState, IUserState>(state => state[USER])
  const state = useSelector<RootState, IChatState>(state => state[CHAT])
  const loading = useSelector<RootState, ILoadingState>(state => state[LOADING])

  const handleClickCreate = () => {
    dispatch(chatThunks.postChatRoom(me))
  }
  const handleClickJoin = (id: string) => {
    push(`/chat/${id}`)
  }

  useEffect(() => {
    dispatch(chatThunks.getChatRooms(me))
  }, [dispatch, me])

  return (
    <main className="main">
      <h2 className="title">ChatList</h2>
      <h3 className="welcome-message">Hello, {id}</h3>
      <div className="btn-wrapper">
        <button className="create-btn" onClick={handleClickCreate}>
          Create
        </button>
      </div>
      <ul className="room-wrapper">
        {loading[CHAT] ? (
          <Loading />
        ) : (
          state.rooms.map((info: IChatRoom, index: number) => (
            <li key={info.id} className="room">
              <div className="room-item room-index">{index}</div>
              <div className="room-item room-title">{info.title}</div>
              <div className="room-item room-created-time">
                {getDate(info.createdTime)}
              </div>
              <div
                className="room-item room-join-btn"
                onClick={() => handleClickJoin(info.id)}
              >
                join
              </div>
            </li>
          ))
        )}
      </ul>
    </main>
  )
}
