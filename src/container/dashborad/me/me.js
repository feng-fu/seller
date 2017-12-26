import React from 'react'
import { WingBlank, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { logout } from './../../../redux/user'
@connect(
  state => state.user,
  { logout }
)

export default class Me extends React.Component {
  render() {
    return (
      <WingBlank>
        <Button type="warning" onClick={() => this.props.logout()}>退出登录</Button>
      </WingBlank>
    )
  }
}