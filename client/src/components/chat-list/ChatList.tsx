import React from 'react'
import { useParams } from 'react-router'

export const ChatList = () => {
  const { id } = useParams()

  return (
    <section>
      <h1>ChatList</h1>
      <h2>Hello, {id}</h2>
      <button>Create</button>
      <ul>
        <li>
          <div>Chat Room Title</div>
          <div>Created Time: 123123</div>
          <button>Join</button>
        </li>
        <li>
          <div>Chat Room Title</div>
          <div>Created Time: 123123</div>
          <button>Join</button>
        </li>
      </ul>
    </section>
  )
}
