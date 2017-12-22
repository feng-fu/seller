import React from 'react'
import { Redirect, withRouter  } from 'react-router-dom'
import { connect } from 'react-redux'
import { userInfo } from "./../../redux/user"
@withRouter
@connect(
  state=>state.user,
  { userInfo }
)
export default class Auth extends React.Component {
  componentDidMount() {
    this.props.userInfo()
  }
  render() {
    const path = this.props.match.path
    return this.props.redirctTo && this.props.redirctTo !== path ? <Redirect to={this.props.redirctTo} /> : null
  }
}