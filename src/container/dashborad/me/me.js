import React from 'react'
import { WingBlank, Button, WhiteSpace, List } from 'antd-mobile'
import { connect } from 'react-redux'
import { logout, changeAvatar } from './../../../redux/user'
import { Redirect } from 'react-router-dom'
const Item = List.Item


@connect(
  state => state.user,
  { logout, changeAvatar }
)
export default class Me extends React.Component {
  constructor(props) {
    super(props)
    this.onAvatarChange = this.onAvatarChange.bind(this)
  }
  onAvatarChange(file) {
    this.props.changeAvatar(this.fileInput.files[0])
  }
  render() {
    return this.props.redirctTo ? (<Redirect to={this.props.redirctTo} />) : (
      <WingBlank>
        <WhiteSpace />
        <WhiteSpace />
        <input type="file" onChange={this.onAvatarChange} ref={input => this.fileInput = input} style={{display: 'none'}} />
        <List>
        <Item onClick={() => this.fileInput.click()} extra={<img className="avatar" style={{width: '60px', height: '60px'}} src={this.props.avatar} alt="avatar" />} wrap multipleLine align="middle">
          头像：
        </Item>
        <Item extra={this.props.name}>
          昵称：
        </Item>
        <Item extra={this.props.type === 'buyer' ? '买家' : '卖家'}>
          分类：
        </Item>
      </List>
        <WhiteSpace />
        <Button type="warning" onClick={() => this.props.logout()}>退出登录</Button>
      </WingBlank>
    )
  }
}