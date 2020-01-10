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
    <section>
      <h1>Chat</h1>
      <label htmlFor="login"></label>
      <input id="login" type="text" onChange={handleChange} />
      <button onClick={handleClick}>Sign in</button>
    </section>
  )
}
