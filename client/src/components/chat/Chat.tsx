import React from 'react'
import { useParams } from 'react-router'

export const Chat = () => {
  const { id } = useParams()

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
