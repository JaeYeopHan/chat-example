import './Chat.scss'

import React, { useEffect, useState, ChangeEvent } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { chatThunks, IChatState, CHAT } from '@/features/chat'
import { RootState } from '@/features'
import { USER, IUserState } from '@/features/user'
import { Message } from './Message'
import { useCheckLogin } from '@/hooks/useCheckLogin'

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
  const handleClickSend = () => {
    if (val === '') {
      return
    }
    dispatch(chatThunks.sendMessage(roomId, me, val))
    setVal('')
  }
  const handleClickInviteButton = () => {
    const targetId = prompt('초대할 ID를 입력해주세요.')

    if (targetId) {
      dispatch(chatThunks.inviteUser(roomId, targetId))
    }
  }

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch(chatThunks.sendImage(roomId, me, e.target.files[0]))
    } else {
      alert('이미지 전송이 실패했습니다.')
    }
  }

  useCheckLogin(me)
  useEffect(() => {
    dispatch(chatThunks.initializeChat(roomId, me))

    return () => {
      dispatch(chatThunks.leaveChat(roomId))
    }
  }, [dispatch, roomId, me])

  return (
    <main className="main">
      <button className="invite-btn" onClick={handleClickInviteButton}>
        Invite
      </button>
      <h2 className="sub-title">Chat: #{roomId}</h2>
      <div className="input">
        <label htmlFor="message-text-input"></label>
        <input
          type="text"
          id="message-text-input"
          className="input-message"
          value={val}
          onChange={handleChange}
        />
        <button className="input-btn" onClick={handleClickSend}>
          Send
        </button>
        <label className="input-btn input-image-label" htmlFor="image">
          Image
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          className="input-image"
          onChange={handleChangeFile}
        />
      </div>
      {messages && (
        <div className="wrapper">
          {messages.map((message, index) => (
            <Message key={`message_${index}`} me={me} {...message} />
          ))}
        </div>
      )}
    </main>
  )
}
