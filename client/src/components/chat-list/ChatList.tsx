import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { chatThunks, CHAT, IChatState } from '@/features/chat'
import { RootState } from '@/features'
import { push } from '@/utils/history'
import { IChatRoom } from '@/api/chat'
import { LOADING, ILoadingState } from '@/features/loading'
import { Loading } from '../shared/Loading'

export const ChatList = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const state = useSelector<RootState, IChatState>(state => state[CHAT])
  const loading = useSelector<RootState, ILoadingState>(state => state[LOADING])

  const handleClickCreate = () => {
    dispatch(chatThunks.postChatRoom())
  }
  const handleClickJoin = (id: string) => {
    push(`/chat/${id}`)
  }

  useEffect(() => {
    dispatch(chatThunks.getChatRooms())
  }, [dispatch])

  return (
    <section>
      <h1>ChatList</h1>
      <h2>Hello, {id}</h2>
      <button onClick={handleClickCreate}>Create</button>
      <ul>
        {loading[CHAT] ? (
          <Loading />
        ) : (
          state.rooms.map((info: IChatRoom) => (
            <li key={info.id}>
              <div>{info.title}</div>
              <div>{info.createdTime}</div>
              <button onClick={() => handleClickJoin(info.id)}>Join</button>
            </li>
          ))
        )}
      </ul>
    </section>
  )
}
