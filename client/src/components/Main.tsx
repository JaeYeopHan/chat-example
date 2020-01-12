import './Main.scss'

import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { userThunks, IUserState, USER } from '@/features/user'
import { RootState } from '@/features'
import { Link } from 'react-router-dom'

export const Main = () => {
  const dispatch = useDispatch()
  const [val, setVal] = useState('')
  const { me } = useSelector<RootState, IUserState>(state => state[USER])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value)
  }
  const handleClick = () => {
    if (val === '') {
      return
    }
    dispatch(userThunks.login(val))
    setVal('')
  }

  if (me !== '') {
    return (
      <main className="main">
        <div className="main-message">반갑습니다! {me}님</div>
        <div className="main-message-link">
          <Link to={`/chat-list/${me}`}>채팅방 리스트로 이동하기</Link>
          <div>
            <button onClick={() => dispatch(userThunks.logout(me))}>
              로그아웃
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="main">
      <h2 className="title">Chat</h2>
      <div className="login">
        <label htmlFor="login"></label>
        <input
          className="login-input"
          id="login"
          type="text"
          onChange={handleChange}
          placeholder="연결할 ID를 입력하세요."
        />
        <div>
          <button className="login-button" onClick={handleClick}>
            Sign in
          </button>
        </div>
      </div>
    </main>
  )
}
