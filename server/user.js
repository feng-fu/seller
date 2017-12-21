const express = require('express');
const router = express.Router();
const model = require('./model')
const UserModel = model.getModel('user')
const crypto = require('crypto');
const bluebird = require('bluebird')
const pbkdf2Async = bluebird.promisify(crypto.pbkdf2)
const { SALT } = require('./constants')

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

const secret = async (password) => {
  return await pbkdf2Async(await pbkdf2Async(password, SALT, 512, 128, 'sha1'), SALT, 512, 128, 'sha1')
}
// define the home page route

router.post('/login', async (req, res) => {
  const { name, pwd } = req.body
  if(!name || !pwd) {
    return res.json({code: 1, msg: '名字和密码不能为空.'})
  }
  try {
    const password = await secret(pwd)
    const exist = await UserModel.findOne({name, pwd: password})
    if(exist) return res.json({code: 0, result: '登录成功~~~'})
    else return res.json({code: 1, result: '用户名或密码不正确'})
  } catch (error) {
  }
})
// define the about route
router.post('/register', async (req, res) => {
  const { name, pwd, type } = req.body
  if(!name || !pwd, !type) {
    return res.json({code: 1, msg: '名字,密码和类型不能为空.'})
  }
  try {
    const exist = await UserModel.findOne({name})
    if(exist) return res.json({code: 1, msg: '这个名字已经被占用啦，换一个吧.'})
    const password = await secret(pwd)
    const result = await UserModel.create({name, pwd: password, type})
    res.send({code: 0, result: '注册成功~~~'})
  } catch (error) {
    console.log(error)
    if(error.code === 11000) {
      return res.json({code: 1, msg: '这个名字已经被占用啦，换一个吧.'})
    } else {
      return res.json({code: 1, msg: '服务器出了点问题.'})
    }
  }
})

module.exports = router