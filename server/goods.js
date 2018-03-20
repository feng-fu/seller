const express = require('express');
const router = express.Router();
const model = require('./model');

const goodsModel = model.getModel('goods');
const userModel = model.getModel('user');

// only seller can publish goods.

const auth = async (req, res, next) => {
  const { name } = req.cookies;
  const userInfo = await userModel.findOne({name});
  if(userInfo.type === 'seller') {
    next()
  } else {
    return res.json({code:1, msg: '无权限'})
  }
}
// seller才可以发布

router
  .post('/add', auth, async (req, res) => {
    const { title, desc, price } = req.body
    if(!title || !price) return res.json({code: 1, msg: '请完善信息'})
    const { name } =req.cookies
    try {
      await goodsModel.create({ user: name, title, price, desc })
      res.json({code: 0, msg: '创建成功'})
    } catch (error) {
      console.log('add goods error:', error.stack)
      res.json({code: 1, msg: '服务器错误'})
    }
  })
  .post('/update', auth, async (req, res, next) => {
    const { query_id, title, desc, price } = req.body
    if(!query_id) return res.json({code: 1, msg: 'query_id 不存在'})
    try {
      const isExist = await goodsModel.findOne({query_id})
      if(!isExist) return res.json({code: 1, msg: '商品信息不存在'})
      const updates = {title, desc, price}
      Object.keys(updates).forEach(v => updates[v] === undefined && delete updates[v])
      const result = await goodsModel.findOneAndUpdate({query_id}, updates, {new: true})
      res.json({code: 0, result})
    } catch (error) {
      console.log('update goods error:', error.stack);
      next(error)
    }
  })
  .get('/list', async (req, res, next) => {
    // page pagesize
    try {
      const result = await goodsModel.find({})
      return res.json({code: 0, result})
    } catch (error) {
      console.log('get goods list error: ', error.stack);
      next(error)
    }
  })


module.exports = router