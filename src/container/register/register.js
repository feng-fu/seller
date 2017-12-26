import React from 'react';
import { connect } from 'react-redux';
import { register } from './../../redux/user'
import { WingBlank, WhiteSpace, Button, InputItem, Radio, List } from 'antd-mobile';
import { Redirect } from 'react-router'
const RadioItem = Radio.RadioItem;
@connect(
  state => state.user,
  { register }
)
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      pwd: '',
      rpwd: '',
      type: 'buyer'
    }
    this.register = this.register.bind(this)
    this.toLogin = this.toLogin.bind(this)
  }
  register() {
    this.props.register(this.state)
  }
  changeState(key, val) {
    this.setState({
      [key]: val
    })
  }
  toLogin() {
    this.props.history.push('/login')
  }
  render() {
    return this.props.redirctTo && this.props.redirctTo !== this.props.match.path ? (<Redirect to={this.props.redirctTo} />) : (
      <WingBlank>
        <InputItem value={this.state.name} onChange={val => this.changeState('name', val)}>用户名</InputItem>
        <WhiteSpace />
        <InputItem value={this.state.pwd} onChange={val => this.changeState('pwd', val)} type="password">密码</InputItem>
        <WhiteSpace />
        <InputItem value={this.state.rpwd} onChange={val => this.changeState('rpwd', val)} type="password">重复密码</InputItem>
        <WhiteSpace />
        <List>
          <RadioItem checked={this.state.type==='buyer'} onChange={e => this.changeState('type', 'buyer')}>买家</RadioItem>
          <RadioItem checked={this.state.type==='seller'} onChange={e => this.changeState('type', 'seller')}>卖家</RadioItem>
        </List>
        <WhiteSpace size="lg" />
        <Button type="primary" onClick={this.register}>注册</Button>
        <WhiteSpace />
        <Button type="ghost" onClick={this.toLogin}>去登录</Button>
      </WingBlank>
    )
  }
}

export default Register