import axios from 'axios'
// import { redirectPosition } from './../utils'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_OCCURED = 'ERROR_OCCURED'
const LOGIN_OUT = 'LOGIN_OUT'

const initState = { 
  errorMsg: '',
  isAuth: false,
  // user info
  avatar: 'http://petrify.oss-cn-beijing.aliyuncs.com/avatar.png',
  name: '',
  type: ''
}

export function user(state=initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, errorMsg: '', isAuth: true, ...action.payload }
    case ERROR_OCCURED:
      return { ...state, errorMsg: action.errorMsg }
    case LOGIN_OUT:
      return initState
    default:
      return state
  }
}

export function errorMsg(msg) {
  return { type: ERROR_OCCURED, errorMsg: msg }
}

function quitLogin(result) {
  return { type: LOGIN_OUT, payload: result }
}

export function authSuccess(result) {
  return { type: AUTH_SUCCESS, payload: result }
}


export function register({name, pwd, rpwd, type}) {
  if(!name || !pwd || !rpwd) return errorMsg('用户名和密码不能为空.')
  if(pwd !== rpwd) return errorMsg('两次密码输入不一致')
  return dispatch => {
    axios.post('/v1/user/register', { name, pwd, type })
      .then(r => {
        r = r.data
        if(r && r.code === 0) {
          return dispatch(authSuccess(r.result))
        }
        return dispatch(errorMsg(r.msg))
      })
      .catch(e => dispatch(errorMsg(e.message)))
  }
}

export function login({name, pwd}) {
  if(!name || !pwd) return errorMsg('用户名和密码不能为空.')
  return dispatch => {
    axios.post('/v1/user/login', { name, pwd })
      .then(r => {
        r = r.data
        if(r && r.code === 0) {
          return dispatch(authSuccess(r.result))
        } else {
          return dispatch(errorMsg(r.msg))
        }
      })
      .catch(e => dispatch(errorMsg(e.message)))
  }
}

export function userInfo() {
  return dispatch => {
    axios.get('/v1/user')
      .then(r => {
        r = r.data
        if(r && r.code === 0) {
          return dispatch(authSuccess(r.result))
        } else {
          return dispatch(errorMsg(r.msg))
        }
      })
      .catch(e => dispatch(errorMsg(e.message)))
  }
}

export function changeAvatar(avatar) {
  const form = new FormData()
  form.append('avatar', avatar)
  return dispatch => {
    axios.post('/v1/upload/avatar', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(r => {
         r = r.data
        if(r && r.code === 0) {
          return dispatch(authSuccess(r.result))
        } else {
          return dispatch(errorMsg(r.msg))
        }
      })
      .catch(e => dispatch(errorMsg(e.msg)))
  }
}

export function logout() {
  return dispatch => {
    axios.post('/v1/user/logout')
      .then(r => {
        r = r.data
        if(r && r.code === 0) {
          return dispatch(quitLogin())
        } else {
          return dispatch(errorMsg(r.msg))
        }
      })
  }
}
