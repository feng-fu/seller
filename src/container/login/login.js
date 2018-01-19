import React from 'react'
import { WingBlank, WhiteSpace, Button, InputItem } from 'antd-mobile';
import { connect } from 'react-redux';
import { login, clearRedirect } from './../../redux/user'
import { Redirect } from 'react-router-dom'
import Logo from './../../component/logo/logo'

@connect(
  state=> state.user,
  { login, clearRedirect }
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
  componentWillMount() {
    this.props.clearRedirect()
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
    return this.props.redirctTo && this.props.redirctTo !== this.props.match.path ? (<Redirect to={this.props.redirctTo} />) : (
      <WingBlank>
        <Logo />
        <InputItem value={this.state.name} onChange={val => this.changeState('name', val)}>用户名</InputItem>
        <WhiteSpace />
        <InputItem value={this.state.pwd} onChange={val => this.changeState('pwd', val)} type="password">密码</InputItem>
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