import React, { useEffect, useState, ChangeEvent } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { chatThunks, IChatState, CHAT } from '@/features/chat'
import { RootState } from '@/features'
import { USER, IUserState } from '@/features/user'
import { Message } from './Message'

export const Chat = () => {
  const { id: roomId = '' } = useParams()
  const dispatch = useDispatch()
  const { me } = useSelector<RootState, IUserState>(state => state[USER])
  const chatState = useSelector<RootState, IChatState>(state => state[CHAT])
  const messages = chatState.chats[roomId]
  const [val, setVal] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value)
  }
  const handleClick = () => {
    if (val === '') {
      return
    }
    dispatch(chatThunks.sendMessage(roomId, me, val))
    setVal('')
  }

  useEffect(() => {
    dispatch(chatThunks.initializeChat(roomId, me))

    return () => {
      dispatch(chatThunks.leaveChat(roomId))
    }
  }, [dispatch, roomId, me])

  return (
    <section>
      <h2>Chat: #{roomId}</h2>
      <label htmlFor="message-text-input"></label>
      <input
        type="text"
        id="message-text-input"
        value={val}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Send</button>

      {messages && (
        <div className="wrapper">
          {messages.map((message, index) => (
            <Message key={`message_${index}`} me={me} {...message} />
          ))}
        </div>
      )}
    </section>
  )
}
