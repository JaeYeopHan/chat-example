import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { chatThunks } from '@/features/chat'

export const Chat = () => {
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(chatThunks.initializeChat(id))
  }, [])

  return (
    <section>
      <h2>Chat: #{id}</h2>
      <label htmlFor="message-text-input"></label>
      <input type="text" id="message-text-input" />
      <button>Send</button>

      <div className="wrapper">
        {/* TextMessage */}
        <div>Sender</div>
        <div>Contents</div>
      </div>
    </section>
  )
}
