import axios from 'axios'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_OCCURED = 'ERROR_OCCURED'
const LOGIN_OUT = 'LOGIN_OUT'
const UPDATE_USERINFO = 'UPDATE_USERINFO'

const initState = {isAuth: false, errorMsg: '', redirctTo: '/login'}
export function user(state=initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, errorMsg: '', isAuth: true }
    case UPDATE_USERINFO:
      return {...state, errorMsg: '', ...action.payload}
    case ERROR_OCCURED:
      return { ...state, isAuth: false, errorMsg: action.errorMsg }
    case LOGIN_OUT:
      return initState
    default:
      return state
  }
}

function errorMsg(msg) {
  return { type: ERROR_OCCURED, errorMsg: msg }
}

function quitLogin(result) {
  return { type: LOGIN_OUT, payload: result }
}

function authSuccess(result) {
  return { type: AUTH_SUCCESS, payload: result }
}

function updateUserInfo(result) {
  return { type: UPDATE_USERINFO, payload: result }
}

export function register({name, pwd, rpwd, type}) {
  if(!name || !pwd || !rpwd) return errorMsg('用户名和密码不能为空.')
  if(pwd !== rpwd) return errorMsg('两次密码输入不一致')
  return dispatch => {
    axios.post('/user/register', {name, pwd, type})
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
    axios.post('/user/login', {name, pwd})
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
    axios.get('/user')
      .then(r => {
        r = r.data
        if(r && r.code === 0) {
          return dispatch(updateUserInfo(r.result))
        } else {
          return dispatch(errorMsg(r.msg))
        }
      })
      .catch(e => dispatch(errorMsg(e.message)))
  }
}

export function logout() {
  return dispatch => {
    axios.post('/user/logout')
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