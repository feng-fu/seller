import React from 'react'
import { WingBlank, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { logout } from './../../../redux/user'
import { Redirect } from 'react-router-dom'
@connect(
  state => state.user,
  { logout }
)

export default class Me extends React.Component {
  render() {
    return this.props.redirctTo ? (<Redirect to={this.props.redirctTo} />) : (
      <WingBlank>
        <Button type="warning" onClick={() => this.props.logout()}>退出登录</Button>
      </WingBlank>
    )
  }
}