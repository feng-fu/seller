const express = require('express')
const router = express.Router()
const multer = require('multer')
const uuid = require('uuid')
const OSS = require('ali-oss')
const ossConfig = require('./config/oss-config')
const client = new OSS.Wrapper(ossConfig);
const path = require('path');
const model = require('./model')
const UserModel = model.getModel('user')

var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

router.post('/avatar', upload.single('avatar'), async (req, res, next) => {
  try {
    const buffer = req.file.buffer
    const filename = uuid.v4() + '.' + req.file.originalname.split('.').pop()
    const uploadResult = await client.put(filename, buffer)
    const result = {avatar: uploadResult.url}
    await UserModel.findOneAndUpdate({name: req.userName}, result)
    return res.json({code: 0, result})
  } catch (error) {
    console.log(error)
    return res.json({
      code: 1,
      msg: error.message,
    })
  }
})


module.exports = router