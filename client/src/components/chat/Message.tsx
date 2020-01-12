import './Message.scss'

import classnames from 'classnames'
import React from 'react'
import { IMessage } from '@/features/chat'

interface IMessageProps extends IMessage {
  me: string
}

export const Message = (props: IMessageProps) => {
  const isAdmin = props.userId === '__admin__'
  const isMe = props.userId === props.me
  const messageStyle = classnames('message', {
    'message-me': isMe,
  })

  if (isAdmin) {
    return <div className="admin-contents">{props.contents}</div>
  }

  return (
    <div className={messageStyle}>
      <div className="message-wrapper">
        <div className="message-name">{props.userId}</div>
        <div className="message-contents">{props.contents}</div>
      </div>
    </div>
  )
}
