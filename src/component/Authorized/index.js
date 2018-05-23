import React from 'react'
import { withRouter,Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Loading from './../Loading'
import { authSuccess, errorMsg } from './../../redux/user'
import axios from 'axios'

const NoMatch = ({ path }) => (
  <Redirect to={{ pathname: path }} />
)

@withRouter
@connect(
  state=>state.user,
  { authSuccess, errorMsg }
)
export default class Auth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      init: false,
      isAuth: false
    }
  }
  componentDidMount() {
    const keepList = ['/login', '/register']
    const pathname = this.props.match.path
    if(keepList.indexOf(pathname) > -1) return

    axios.get('/user')
    .then(r => {
      r = r.data
      if(r && r.code === 0) {
        this.setState({
          init: true
        })
        return this.props.authSuccess(r.result)
      } else {
        this.setState({
          init: true
        })
        return this.props.errorMsg(r.msg)
      }
    })
    .catch(e => {
      this.setState({
        init: true
      })
      return this.props.errorMsg(e.message)
    })
  }
  render() {
    const { isAuth } = this.props
    return this.state.init ? (
      isAuth ? this.props.children : <NoMatch path="/login" />
    ) : <Loading />
  }
}