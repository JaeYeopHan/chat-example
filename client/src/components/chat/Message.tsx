import './Message.scss'

import classnames from 'classnames'
import React from 'react'
import { IMessage } from '@/features/chat'

interface IMessageProps extends IMessage {
  me: string
}

export const Message = (props: IMessageProps) => {
  const { me, userId, type, contents } = props
  const isAdmin = userId === '__admin__'
  const isMe = userId === me
  const messageStyle = classnames('message', {
    'message-me': isMe,
  })

  if (isAdmin) {
    return <div className="admin-contents">{contents}</div>
  }

  return (
    <div className={messageStyle}>
      <div className="message-wrapper">
        <div className="message-name">{userId}</div>
        {type === 'text' ? (
          <div className="message-contents">{contents}</div>
        ) : (
          <img className="message-image" src={contents} alt="image_alt" />
        )}
      </div>
    </div>
  )
}
