import React from 'react'
import { IChatRoom } from '@/api/chat'
import { getDate } from '@/utils/date'
import { push } from '@/utils/history'

interface IRoomsProps {
  rooms: IChatRoom[]
}

export const Rooms = (props: IRoomsProps) => {
  const handleClickJoin = (id: string) => {
    push(`/chat/${id}`)
  }

  if (props.rooms.length === 0) {
    return <div>초대되거나 만든 방이 없습니다. 방을 만들어주세요.</div>
  }

  return (
    <>
      {props.rooms.map((info: IChatRoom, index: number) => (
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
      ))}
    </>
  )
}
