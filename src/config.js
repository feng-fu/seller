import axios from 'axios'
import { Toast } from 'antd-mobile'
axios.interceptors.request.use(config => {
  console.log('start request data.')
  Toast.loading('加载中')
  return config
}, error => {
  console.log('send data error.')
})

axios.interceptors.response.use(config => {
  console.log('data return.')
  Toast.hide()
  return config
}, error => {
  Toast.fail()
  console.log('get data error.')
})