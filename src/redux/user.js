import axios from 'axios'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_OCCURED = 'ERROR_OCCURED'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'

const initState = {isAuth: false, errorMsg: ''}
export function user(state=initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isAuth: true }
    case ERROR_OCCURED:
      return { ...state, isAuth: false, ...action.payload }
    case REGISTER_SUCCESS:
      return { ...state, isAuth: true }
    default:
      return state
  }
}

function errorMsg(msg) {
  return {type: ERROR_OCCURED, errorMsg: msg}
}

export function register({name, pwd, rpwd, type}) {
  console.log('1212')
  if(!name || !pwd || !rpwd) return errorMsg('用户名和密码不能为空.')
  if(pwd !== rpwd) return errorMsg('两次密码输入不一致')
  return dispatch => {
    axios.post('/user/register', {name, pwd, type})
      .then(r => {
        console.log(r)
        return errorMsg('121212')
      })
      .catch(e => errorMsg(e.message))
  }
}