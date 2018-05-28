import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom'
import DashBoard from './../container/dashborad/dashborad'

export default class BasicLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}    
  }
  render() {
    return (
      <Fragment>
        <Route path="/dashboard" component={DashBoard} />
        <Redirect exact from="/" to="/dashboard" />
      </Fragment>
    )
  }
}