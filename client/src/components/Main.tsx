import './Main.scss'

import React, { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

import { userThunks } from '@/features/user'

export const Main = () => {
  const dispatch = useDispatch()
  const [val, setVal] = useState('')
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
