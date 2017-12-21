import React from 'react'
import { WingBlank, WhiteSpace, Button, InputItem, Radio, List } from 'antd-mobile';
import { connect } from 'react-redux';
import { login } from './../../redux/user'

@connect(
  state=> state.user,
  { login }
)
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      pwd: ''
    }
    this.toRegister = this.toRegister.bind(this)
    this.login = this.login.bind(this)
  }
  changeState(key, val) {
    this.setState({
      [key]: val
    })
  }
  login() {
    this.props.login(this.state)
  }
  toRegister() {
    this.props.history.push('/register')
  }
  render() {
    return (
      <WingBlank>
        <InputItem value={this.state.name} onChange={val => this.changeState('name', val)}>用户名</InputItem>
        <WhiteSpace />
        <InputItem value={this.state.pwd} onChange={val => this.changeState('pwd', val)}>密码</InputItem>
        <WhiteSpace />
        <WhiteSpace size="lg" />
        <Button type="primary" onClick={this.login}>登录</Button>
        <WhiteSpace />
        <Button type="ghost" onClick={this.toRegister}>去注册</Button>
      </WingBlank>
    )
  }
}

export default Login