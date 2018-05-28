import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Authorized from './component/Authorized/'
import UserLayout from './layout/UserLayout'
import BasicLayout from './layout/BasicLayout'

function RouterConfig() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/user" component={UserLayout} />
        <Authorized
          path="/"
          redirectPath="/user/login"
        >
          <BasicLayout />
        </Authorized>
      </Switch>
    </BrowserRouter>
  )
}

export default RouterConfig
