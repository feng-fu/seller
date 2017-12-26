const express = require('express');
const router = express.Router();
const model = require('./model')
const UserModel = model.getModel('user')
const crypto = require('crypto');
const bluebird = require('bluebird')
const pbkdf2Async = bluebird.promisify(crypto.pbkdf2)
const { SALT } = require('./constants')
const uuidV4 = require('uuid/v4')

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

const secret = async password => {
  return await pbkdf2Async(await pbkdf2Async(password, SALT, 512, 128, 'sha1'), SALT, 512, 128, 'sha1')
}
const filter = data => {
  data = data.toObject()
  const {pwd, __v, ...result} = data
  return result
}
const setSession = async (redis, name) => {
  try {
  await redis.connect()
  const val = uuidV4()
  await redis.setex(name, 1440000, val)
  await redis.disconnect()
  return val
  } catch (error) {
    console.log('err:', error)
    throw new Error('connect redis error.')
  }
}



router.get('/', async (req, res) => {
  const { name } = req.cookies
  try {
    const result = await UserModel.findOne({name})
    return res.json({code: 0, result: filter(result)})
  } catch (error) {
    return res.json({code: 1, msg: '服务器错误'})
  }
})

router.post('/login', async (req, res) => {
  const { name, pwd } = req.body
  const redis = req.redis
  if(!name || !pwd) {
    return res.json({code: 1, msg: '名字和密码不能为空.'})
  }
  try {
    const password = await secret(pwd)
    const exist = await UserModel.findOne({name, pwd: password})
    if(exist) {
      const sessionId = await setSession(redis, name)
      res.cookie('sessionId', sessionId, { maxAge: 144000000, httpOnly: true })
      res.cookie('name', name, { maxAge: 144000000, httpOnly: true })
      return res.json({code: 0, result: filter(exist)})
    }
    else return res.json({code: 1, msg: '用户名或密码不正确'})
  } catch (error) {
    console.log('login error:', error.stack)
    return res.json({code: 1, msg: error.message})
  }
})
// define the about route
router.post('/register', async (req, res) => {
  const { name, pwd, type } = req.body
  const redis = req.redis
  if(!name || !pwd || !type) {
    return res.json({code: 1, msg: '名字,密码和类型不能为空.'})
  }
  try {
    const exist = await UserModel.findOne({name})
    if(exist) return res.json({code: 1, msg: '这个名字已经被占用啦，换一个吧.'})
    const password = await secret(pwd)
    const result = await UserModel.create({name, pwd: password, type})
    const sessionId = await setSession(redis, name)
    res.cookie('sessionId', sessionId, { maxAge: 144000000, httpOnly: true })
    res.cookie('name', name, { maxAge: 144000000, httpOnly: true })
    res.send({code: 0, result: filter(result)})
  } catch (error) {
    console.log(error.stack)
    if(error.code === 11000) {
      return res.json({code: 1, msg: '这个名字已经被占用啦，换一个吧.'})
    } else {
      return res.json({code: 1, msg: '服务器出了点问题.'})
    }
  }
})

router.post('/logout', async (req, res) => {
  res.clearCookie('sessionId')
  res.clearCookie('name')
  res.json({code: 0, result: '退出成功'})
})



module.exports = router