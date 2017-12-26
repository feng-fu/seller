import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import './config';
import './index.css';
import reducer from './reducer';
import Login from './container/login/login'
import Register from './container/register/register'
import Dashborad from './container/dashborad/dashborad'
import Auth from './component/auth/auth'

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Auth></Auth>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route component={Dashborad}/>
          
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)