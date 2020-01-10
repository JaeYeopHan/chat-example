import React from 'react'
import { IMessage } from '@/features/chat'

interface IMessageProps extends IMessage {
  me: string
}

export const Message = (props: IMessageProps) => {
  const isMe = props.userId === props.me

  return (
    <div>
      <div className="profile">
        {isMe ? '[Me] ' : ''} {props.userId}:
      </div>
      <div className="contents">{props.contents}</div>
    </div>
  )
}
