import React from 'react'
import { withRouter  } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUserInfo, errorMsg } from "./../../redux/user"
import axios from 'axios'
@withRouter
@connect(
  state=>state.user,
  { updateUserInfo, errorMsg }
)
export default class Auth extends React.Component {
  componentDidMount() {
    const keepList = ['/login', '/register']
    const pathname = this.props.match.path
    if(keepList.indexOf(pathname) > -1) return

    axios.get('/user')
    .then(r => {
      r = r.data
      if(r && r.code === 0) {
        return this.props.updateUserInfo(r.result)
      } else {
        this.props.history.push('/login')
        return this.props.errorMsg(r.msg)
      }
    })
    .catch(e => {
      this.props.history.push('/login')
      return this.props.errorMsg(e.message)
    })
  }
  render() {
    return null
  }
}