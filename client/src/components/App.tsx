import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { ChatList } from './chat-list/ChatList'
import { Main } from './Main'

export default () => {
  return (
    <Switch>
      <Route exact={true} path="/chat-list/:id" component={ChatList} />
      <Route exact={true} path="/" component={Main} />
    </Switch>
  )
}
