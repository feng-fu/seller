import React from 'react'
import { WingBlank, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { clearRedirect } from './../../../redux/user'
import { Redirect } from 'react-router-dom'
@connect(
  state => state.user,
  { clearRedirect }
)

export default class List extends React.Component {
  componentWillMount() {
    this.props.clearRedirect()
  }
  render() {
    return (
      <div>商品列表</div>
    )
  }
}